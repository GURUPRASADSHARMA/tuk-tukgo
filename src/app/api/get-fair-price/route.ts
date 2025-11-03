import { connectDb } from "@/lib/connectDb";
import { Price } from "@/models/Price";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request:NextRequest){

    await connectDb();

    try {

        const reqBody = await request.json();
        const {from ,to} = reqBody       
        const price = await Price.findOne({ $and: [ { $or: [ { "segments.from": { $regex: from, $options: "i" } }, { "segments.to": { $regex: from, $options: "i" } } ] }, { $or: [ { "segments.from": { $regex: to, $options: "i" } }, { "segments.to": { $regex: to, $options: "i" } } ] } ] });
        if(!price){
            return NextResponse.json({message:"no price or data available for required route,sorry for inconveniance"},{status:500})
        }

        const startIndex = price.segments.findIndex((seg)=>seg.from===from || seg.to===from);
        const endIndex = price.segments.findIndex((seg)=>seg.to===to || seg.from===to);



       // If forward path found
if (startIndex <= endIndex && startIndex !== -1 && endIndex !== -1) {
  const start = price.segments.findIndex((seg)=>seg.from===from);
  const end = price.segments.findIndex((seg)=>seg.to===to);
  const data = price.segments.slice(start,end+1);

  const totalPrice = data.reduce((sum,u)=>sum + u.price,0);

  return NextResponse.json({totalPrice,data},{status:201});
} 

// Else try reverse path
else {
  const start = price.segments.findIndex((seg)=>seg.from===to);
  const end = price.segments.findIndex((seg)=>seg.to===from);

  if (start === -1 || end === -1 || start > end) {
    return NextResponse.json({message:"No valid reverse path found"},{status:404});
  }

  // Walk the path forward (to -> from) then flip edges
  const data = price.segments.slice(start,end+1);
  const requiredData = data
    .reverse()
    .map((seg)=>({
      from: seg.to,
      to: seg.from,
      price: seg.price
    }));

  const totalPrice = requiredData.reduce((sum,seg)=>sum+seg.price,0);

  return NextResponse.json({totalPrice,requiredData},{status:201});
}


        
    } catch (error) {
        console.log("something went wrongduring getting fairPrice",error);
        return NextResponse.json({message:"error in getting the fairPrice"},{status:500});
    }

}