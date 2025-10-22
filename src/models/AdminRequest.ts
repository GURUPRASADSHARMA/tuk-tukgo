import mongoose ,{ObjectId, Schema}from "mongoose";


interface AdminRequest extends Document{
   userId?:ObjectId,
    reason?:string,
    status?:string
}

const adminRequestSchema:Schema<AdminRequest> = new Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        reason:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["pending","accepted"],
            default:"pending"

        }
},{timestamps:true})

export const AdminRequest= (mongoose.models.AdminRequest as mongoose.Model<AdminRequest> ||  mongoose.model("AdminRequest",adminRequestSchema))