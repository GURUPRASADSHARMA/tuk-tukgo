import { connectDb } from "@/lib/connectDb";
import { Donation } from "@/models/Donation";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    await connectDb();
    try {

        const donars = await Donation.aggregate([
            {$match:{status:"completed"}},
            {$sort:{createdAt:-1}},
            {$limit:5},
            {
                $lookup:{
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {$unwind:"$user"},
            {$project:{
                _id:0,
                name:"$user.name",
                avatar:"$user.image",
                amount:{
                  $concat:["₹",{$toString:"$amount"}]
                },
                createdAt:1
            }}
        ])

        if(!donars){
            return NextResponse.json({message:"cannot find the user"},{status:400})
        }
        return NextResponse.json({donars},{status:200})
    } catch (error) {
        console.log(error)
    }
}