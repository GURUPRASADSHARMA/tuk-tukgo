import { connectDb } from "@/lib/connectDb";
import { Price } from "@/models/Price";
import { NextRequest, NextResponse } from "next/server";
import { Checkpoint } from "@/models/Price";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOption } from "../auth/[...nextauth]/route";


export async function POST(request:NextRequest){
    await connectDb();

    
    try {
        const session= await getServerSession(authOption)
  
        const user = session?.user
        const reqBody = await request.json()
        const {from ,to,checkpoints,finalPrice}=reqBody
        const segment = [];
        let start = from ;
          await User.findOneAndUpdate({email:user?.email},
            {
                $inc:{contributionCount:1}
            },
            {new:true}
        )
        const existingRoute = await Price.findOne({
  $and: [
    { $or: [{ "segments.from": from }, { "segments.to": from }] },
    { $or: [{ "segments.from": to }, { "segments.to": to }] }
  ]
});

if(existingRoute){
    return NextResponse.json({message:"data alredy present , thanks for your effort"},{status:500})
}
        
        for(const obj of checkpoints){
            segment.push({
                from:start,
                to:obj.location,
                price:obj.price
            })
            start = obj.location;
        }

        segment.push({
            from:start,
            to,
            price:finalPrice
        })



        const newPrice = await Price.create({
            from,
            to,
            checkpoints,
            segments:segment,
            email:user?.email,
        })
 
        return NextResponse.json(newPrice,{status:202})
   
    } catch (error) {
        console.log("something went wrong during contribution",error)
       return NextResponse.json({
            error:error,
            message:"something went wrong during contributing"
        },{status:500})
    }
}