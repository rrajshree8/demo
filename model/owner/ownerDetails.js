const mongoose=require("mongoose")


const ownerDetails=new mongoose.Schema({
    name:{ type : String , required : true },
    email:{ type : String , unique : true, required : true },
    phone:{ type : String , unique : true, required : true },
    password:{ type : String , required : true },
    address:{ type : String , required : true }
})


const Owner=mongoose.model('Owner',ownerDetails)


module.exports={
    Owner
}