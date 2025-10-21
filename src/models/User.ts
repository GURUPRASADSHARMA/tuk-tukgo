import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose"


export interface User{
   googleId?:string,
   email:string,
   name:string,
   avatar:string,
   createdAt:Date,
   contribution?:[],
   isAdmin:boolean
   contributionCount?:number
}

// export interface Contribution{
//     from?:string,
//     to?:string,
//     price?:number,
//     createdAt:Date
// }


// const contributionSchema :Schema<Contribution> = new Schema({
//     from:{
//         type:String,
//         required:true
//     },
//     to:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     createdAt:{
//         type:Date,
//         required:true
//     }
// })


const userSchema :Schema<User> = new Schema({
        googleId:{
            type:String,
            required:true,
            unique:true
        },

        name:{
            type:String,
            required:true,
            unique:true
        },

        email:{
            type:String,
            required:true,
            unique:true
        },

        avatar:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            required:true
        },
        contributionCount:{
            type:Number,
            default:0
        },

        isAdmin:{
            type:Boolean,
            default:false
        }
},)


const User = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchema))
export default User;