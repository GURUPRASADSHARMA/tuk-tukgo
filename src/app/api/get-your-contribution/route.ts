import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";
import User from "@/models/User";


export async function POST(request:NextRequest){
    await connectDb();

    try {
    const session = await getServerSession(authOption);
    const email = session?.user?.email

    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"user not found during getting contribution"})
    }
    
    return NextResponse.json({message:"contribution fetched successfully",contribtion:user.contributionCount})

    } catch (error) {
        console.log("something went wrong during getting contribution",error)
    }
}