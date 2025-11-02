import { connectDb } from "@/lib/connectDb";
import { Price } from "@/models/Price";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await connectDb();
    try {
        const response = await Price.find().sort({createdAt:-1}).limit(4);
        const data = response.map((obj)=>({
            from:obj.from,
            to:obj.to,
            price:obj.segments.reduce((sum,obj)=>sum+obj.price,0),
            checkpoints:obj.checkpoints.length,
            contributor: obj?.email ? obj.email.split('@')[0] : "unknown",
            time:new Date((obj as any).createdAt).toLocaleString()
        }))
        return NextResponse.json({message:"contribution fetched successfully",data},{status:200})
    } catch (error) {
        console.log("something went wrong during getting recent contribution",error)
    }
}