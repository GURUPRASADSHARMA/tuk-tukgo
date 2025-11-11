import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount, name, email } = await req.json();

    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;
    const txnid = Math.random().toString(36).substring(2, 15); 

    const productinfo = "Local Fair Donation";
    const surl = `${process.env.BASE_URL}/api/donation/webhook`;
    const furl = `${process.env.BASE_URL}/api/donation/webhook`;

  
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  
    const payuData = {
      key,
      txnid,
      amount: amount.toString(),
      productinfo,
      firstname: name,
      email,
      phone: "9999999999",
      surl,
      furl,
      hash,
      action: "https://test.payu.in/_payment", 
      service_provider: "payu_paisa",
    };

    return NextResponse.json({
      success: true,
      payuData,
    });
  } catch (err: any) {
    console.error("PayU error:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
