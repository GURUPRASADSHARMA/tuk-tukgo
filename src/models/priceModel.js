const { default: mongoose } = require("mongoose");
const { type } = require("os");


 const priceModel = mongoose.Schema({

        from:{
            type:String,
            tolowercase:true
        },
        to:{
            type:String,
            tolowercase:true
        },
        price:{
            type:Number,
        }
})

const Price = mongoose.models.prices || mongoose.model("prices",priceModel)
export default Price