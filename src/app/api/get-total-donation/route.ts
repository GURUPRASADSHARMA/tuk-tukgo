import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";
import { Donation } from "@/models/Donation";


export async function GET(req:NextRequest){
    await connectDb();
    try {
        // const arr = await Donation.find({status:"completed"})
        // const total = arr.reduce((sum,eachObj)=>sum + eachObj.amount,0) // sum =0 initial


        // aggregate logic to calculate total donation
        const totalAmount = await Donation.aggregate([
            {$match:{status:"completed"}},
            {
                $group:{
                    _id:null,
                    totalDonation:{$sum:"$amount"}
                }
            }
        ])

       const donation = totalAmount.length>0 ? totalAmount[0].totalDonation:0
       const length = totalAmount.length
        return NextResponse.json({donation,length},{status:200})
        
} catch (error) {
    console.log(error)
    console.log("something went wrong during calculating total donation ")
}
}