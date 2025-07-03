import { db } from "@/dbconfige/dbConfig";
import { NextResponse,NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { start, end } = reqbody;
    console.log(start, end);
    const res = await db.query(
      "SELECT * FROM fairPrice.price WHERE start = ? AND `end` = ?",
      [start, end]
    );
    return NextResponse.json(res[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong during query db", { status: 400 });
  }
}
