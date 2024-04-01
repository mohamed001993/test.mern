const mongoose=require("mongoose")
const User = require("./User")

const productSchema=new mongoose.Schema({
name:{type:String,required:true},
description:{type:String,required:true},
price:{type:Number,required:true},
img:{type:String},
seller:{type:mongoose.Schema.Types.ObjectId,ref:User}
})
const product= mongoose.model("product",productSchema)//sandou9

module.exports=product