"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default function DonationStatus() {
  const params = useSearchParams();
  const status = params.get("status");
  const txnid = params.get("txnid");
  const success = status === "success";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${success ? "bg-green-50" : "bg-red-50"}`}>
      {success ? (
        <>
          <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful 🎉</h1>
        </>
      ) : (
        <>
          <XCircle className="w-16 h-16 text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed ❌</h1>
        </>
      )}
      <p className="text-gray-600 mb-4">Transaction ID: {txnid}</p>
      <Link href="/dashboard" className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all">
        Back to Dashboard
      </Link>
    </div>
  );
}
