import { connectDb } from "@/lib/connectDb";
import { AdminRequest } from "@/models/AdminRequest";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await connectDb();
    try {

        const reqBody = await req.json()
        const  {userId,reason} = reqBody


        const user= await User.findById(userId)
        if(!user){
            return NextResponse.json({message:"invalid user"},{status:400})
        }
        const requestExist = await AdminRequest.findOne({userId});
        if(requestExist){
            return NextResponse.json({message:"you have already requested"},{status:400});
        }
        const newRequest = await AdminRequest.create({
            userId:user._id,
            reason,
        })
        return NextResponse.json({message:"requested sucessfully",newRequest},{status:200})

    } catch (error) {
        console.log("something went wrong during admin requesting api",error);

    }
}