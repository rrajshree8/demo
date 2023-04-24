const mongoose=require("mongoose")


const workerDetails=new mongoose.Schema({
    name:{ type : String , required : true },
    email:{ type : String , unique : true, required : true },
    phone:{ type : String , unique : true, required : true },
    password:{ type : String , required : true },
    state:{ type : String , required : true },
    district:{ type : String , required : true },
    subDistrict:{ type : String , required : true },
    category:{ type : String , required : true }
})


const Worker=mongoose.model('Worker',workerDetails)


module.exports={
    Worker
}