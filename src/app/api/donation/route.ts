import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { authOption } from "../auth/[...nextauth]/route";
import { Donation } from "@/models/Donation";
import crypto from "crypto";
import User from "@/models/User";


const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})

export async function POST(req:NextRequest){
await connectDb();
const session = await getServerSession(authOption);
const userId = session?.user._id
try {

    const reqBody = await req.json();
    const {action,amount} = reqBody;


    if(action=="create"){
          if (!amount || amount <= 0)
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

        const order = await  razorpay.orders.create({
            amount:amount*100,
            currency:"INR",
            payment_capture:true

        })
        return NextResponse.json({orderId:order.id},{status:200})
    }

    if(action=="verify"){
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature,amount} = reqBody;
      if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        return NextResponse.json({error:"invalid credential or Missing payment details"},{status:400})
      }
       const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

        const isValid = expectedSignature === razorpay_signature
        const status = isValid ? "completed":"failed"

        await Donation.create({
            userId,
            amount,
            razorpayOrderId:razorpay_order_id,
            status
        })

        await User.findByIdAndUpdate(userId,{
          $inc:{donation:amount}
        })


        return NextResponse.json({success:isValid});
    }

    return NextResponse.json({message:"invalid action"},{status:400});
    
} catch (error) {
    console.error("Donation API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
}

}