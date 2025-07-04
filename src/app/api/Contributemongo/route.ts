import { NextRequest,NextResponse } from "next/server";
import { mongoDb } from "@/mongoDb/mongoDb";
import Price from "@/models/priceModel"

mongoDb();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {from ,to,price}= reqBody;
    
        const existingData = await Price.findOne({from,to});
        if(existingData){
            return NextResponse.json({message:"data exist already"},{status:400})
        }
      const newData = new Price({
        from:from,
        to:to,
        price:price
      })
    
      const savedData= await newData.save();
      console.log(savedData);
    
      return NextResponse.json({message:"data saved sucessfuly"},savedData)
    
    } catch (error) {
        console.log("something went wrong during api call ")
        console.log(error)
    }

}