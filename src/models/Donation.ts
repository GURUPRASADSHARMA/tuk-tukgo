import mongoose, { Schema, Document } from "mongoose";

export interface Donation extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  gateway: "payu" | "razorpay" | "manual";
  transactionId: string;      
  paymentStatus: "pending" | "success" | "failed";
  paymentResponse?: object;    
  createdAt: Date;
}

const donationSchema = new Schema<Donation>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  gateway: {
    type: String,
    enum: ["payu", "razorpay", "manual"],
    default: "payu",
  },
  transactionId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  paymentResponse: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Donation =
  mongoose.models.Donation ||
  mongoose.model<Donation>("Donation", donationSchema);
