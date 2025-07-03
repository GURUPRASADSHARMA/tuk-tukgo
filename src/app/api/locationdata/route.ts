import { db } from "@/dbconfige/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    try {
      const reqBody = await request.json()
      const {start,end}= reqBody
      const res = await db.query("select * from location.places where name in (?, ?);",[start,end]);
      console.log(res[0]);
      return NextResponse.json(res[0]);
    } catch (error) {
     return NextResponse.json("something error during db query for places")
    }
}