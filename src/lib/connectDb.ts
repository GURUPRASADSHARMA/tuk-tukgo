import mongoose from "mongoose";

type connectionObject = {
    isConnected?:number
}

 const connection:connectionObject  = {
 };

export async function connectDb():Promise<void>{
if(connection.isConnected){
    console.log("database already connected")
    return
}

   try {
     const db = await mongoose.connect(process.env.MONGO_DB_URI ||"",{})
        connection.isConnected=db.connections[0].readyState
        console.log("db connected succesfully")

   } catch (error) {
    console.log("error during database connection")
    process.exit();
   }

}

