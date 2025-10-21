import mongoose ,{Schema}from "mongoose";


interface AdminRequest extends Document{
    email?:string,
    reason?:string,
    createdAt?:Date
}

const adminRequestSchema:Schema<AdminRequest> = new Schema({
        email :{
            type:String,
            required:true
        },
        reason:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            required:true
        }
},{timestamps:true})

export const AdminRequest= (mongoose.models.AdminRequest as mongoose.Model<AdminRequest> ||  mongoose.model("AdminRequest",adminRequestSchema))