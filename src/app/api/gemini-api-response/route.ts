import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDb } from "@/lib/connectDb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  await connectDb()
  try {
    const body = await req.json();
    const { startLocation, stops, endLocation, budget, preferences } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
You are a trip planning assistant specialized in auto-rickshaw travel in India.  
Your task: Plan an optimized trip given user inputs.

Inputs:
- Start: ${startLocation}
- Stops: ${stops.map((s: any) => s.location).join(", ")}
- End: ${endLocation}
- Budget: ₹${budget}
- Preferences: ${JSON.stringify(preferences)}

Constraints:
1. Break down the trip into segments (from → to).
2. For each segment provide:
   - fare (integer, INR)
   - estimated time (minutes, integer)
   - distance (km, float, one decimal)
   - alternative options (array of strings if any)
3. Calculate total fare and total time.
4. Provide budget analysis:
   - withinBudget (boolean)
   - savings (budget - totalFare, integer)
   - alternatives (array of budget suggestions)
5. Provide AI insights (traffic, cost vs time tradeoffs, weather, peak hours).
6. try to utilize the given budget and plan accordingly and be practical about fair used in transportation.
7.Provide the hotel and stay information as well
8. Return ONLY valid JSON following this schema:

{
  "totalFare": number,
  "totalTime": number,
  "budgetAnalysis": {
    "withinBudget": boolean,
    "savings": number,
    "alternatives": string[]
  },
  "geminiInsights": string[],
  "routes": [
    {
      "from": string,
      "to": string,
      "fare": number,
      "time": number,
      "distance": string,
      "alternatives": string[]
    }
  ]
}
    `;

    const result = await model.generateContent(prompt);

    // --- Extract Gemini text safely ---
    let text = "";
    try {
      if (typeof result.response.text === "function") {
        text = result.response.text();
      } else {
        text =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    } catch (err) {
      console.error("Error extracting Gemini text:", err);
      return NextResponse.json(
        { error: "Failed to extract Gemini response" },
        { status: 500 }
      );
    }

    // --- Clean fenced JSON if present ---
    text = text.replace(/```json|```/g, "").trim();
    console.log("Gemini raw text:", text);

    if (!text) {
      return NextResponse.json(
        { error: "Gemini returned empty response" },
        { status: 500 }
      );
    }

    // --- Try JSON.parse ---
    try {
      const plan = JSON.parse(text);
      console.log("Final trip plan:", plan);
      return NextResponse.json(plan);
    } catch (err) {
      console.error("JSON parse error:", err);
      // Instead of killing with 500, return raw text for debugging
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          raw: text,
        },
        { status: 200 } // 👈 still return 200 so frontend can handle it
      );
    }
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
