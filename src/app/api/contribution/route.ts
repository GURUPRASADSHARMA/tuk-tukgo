import { NextRequest,NextResponse } from "next/server";
import { db } from "@/dbconfige/dbConfig";

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        const {from ,to,localFairPrice}=reqBody;
        const price = Number(localFairPrice);
        const res = await db.query("insert ignore into fairPrice.price (start,end,price) values (?,?,?)",[from,to,price])
        if (!res) {
  return NextResponse.json({ message: "Insert failed." });
}
       return NextResponse.json({message:"insertion perfectly done"});
    } catch (error) {
        return NextResponse.json({message:"something went wrong during database connection"})
    }

}