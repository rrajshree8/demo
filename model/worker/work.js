const  mongoose = require("mongoose");

const workSchema=new mongoose.Schema({
   category:String,
   state:String,
   district:String,
   subDistrict:String,
   isActive:{type:Boolean,default:true},
   workerId:String,
   ownerId:String,
   isDone:{type:Boolean,default:false}

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

  const Work=mongoose.model("Work",workSchema);

  module.exports=Work