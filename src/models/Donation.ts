import mongoose ,{Mongoose, ObjectId, Schema}from "mongoose";


interface Donation{
    userId:mongoose.Types.ObjectId,
    amount:number,
    razorpayOrderId:string,
    status:string,
    createdAt:Date
}


const donationSchema:Schema<Donation> = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        refrence:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    razorpayOrderId:{
        type:String,
        required:true

    },
    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Donation =
  (mongoose.models.Donation as mongoose.Model<Donation>) ||
  mongoose.model<Donation>("Donation", donationSchema);
