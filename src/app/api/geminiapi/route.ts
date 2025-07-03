import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { prompt } = reqBody;

  if (!prompt) {
    return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
  }

  const geminiKey = process.env.GEMINI_API_KEY || "YOUR_HARDCODED_KEY";
  console.log("Gemini API Key:", geminiKey);

  if (!geminiKey) {
    return NextResponse.json({ message: "GEMINI_API_KEY is missing!" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(geminiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user", // ✅ REQUIRED!
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = await result.response.text();
    console.log("Generated text:", text);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { message: "Something went wrong during Gemini API call" },
      { status: 400 }
    );
  }
}
