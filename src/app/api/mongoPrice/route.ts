import { NextRequest,NextResponse } from "next/server";
import { mongoDb } from "@/mongoDb/mongoDb";
import Price from "@/models/priceModel"

mongoDb();
export async function POST(request:NextRequest){

    const reqBody = await request.json();
    const {from,to} = reqBody

   const price= await Price.findOne({from,to}).select("-_id");
   if(!price){
    return NextResponse.json({message:"cannot find the above credentials"},{status:500})
   }

   return NextResponse.json({message:'data fetched sucessfuly'},price)
}