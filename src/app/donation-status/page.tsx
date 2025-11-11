"use client";

import { Suspense } from "react";
import DonationStatusContent from "./status-content";


export default function DonationStatus() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
    <DonationStatusContent/>
    </Suspense>
  );
}
