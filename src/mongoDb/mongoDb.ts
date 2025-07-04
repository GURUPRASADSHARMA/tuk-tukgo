import mongoose, { connection } from "mongoose";


export async function mongoDb(){

    try {

         await mongoose.connect("mongodb url import from env");
         connection.on('connected',()=>{
            console.log("database connected")
         })
         connection.on('error',(error)=>{
            console.log("something went wrong during db connnection",error)
            process.exit();
         })

    } catch (error) {
        console.log("db not connected")
        console.log(error)
    }
}