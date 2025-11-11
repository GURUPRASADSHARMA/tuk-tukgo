import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Donation } from "@/models/Donation";
import { connectDb } from "@/lib/connectDb";

export async function POST(req: NextRequest) {
  try {

    await connectDb();

 
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash,
    } = data;


    const salt = process.env.PAYU_SALT!;
    const reverseHashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const expectedHash = crypto.createHash("sha512").update(reverseHashString).digest("hex");

    if (expectedHash !== hash) {
      console.error("❌ Invalid PayU hash – possible tampering.");
      return NextResponse.json(
        { success: false, message: "Invalid hash" },
        { status: 400 }
      );
    }


    console.log(`✅ Verified ${status} payment for ₹${amount} by ${firstname}`);

    
    await Donation.findOneAndUpdate(
      { transactionId: txnid },
      {
        userId: null, 
        amount: Number(amount),
        gateway: "payu",
        transactionId: txnid,
        paymentStatus: status === "success" ? "success" : "failed",
        paymentResponse: data,
      },
      { upsert: true, new: true }
    );

  
    const redirectUrl = `${process.env.BASE_URL}/donation-status?txnid=${txnid}&status=${status}`;
    return NextResponse.redirect(redirectUrl);
  } catch (err: any) {
    console.error("💥 Webhook error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
