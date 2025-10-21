import { connectDb } from "@/lib/connectDb";
import { AdminRequest } from "@/models/AdminRequest";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await connectDb();
    try {

        const reqBody = await req.json()
        const  {email,reason} = reqBody

        const user= await User.findOne({email:email})
        if(!user){
            return NextResponse.json({message:"Invalid email.please provide loggedIn email"},{status:400})
        }
        const requestExist = await AdminRequest.findOne({email})


    } catch (error) {
        
    }
}