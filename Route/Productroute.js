const express=require("express")
const product=require("../Model/Product")
const isAuth = require("../Middelwares/isAuth")
const upload = require("../utils/multer")

const router=express.Router()

router.get("/",async(req,res)=>{
    try{
        const  result= await product.find().populate("seller")
        res.send(result)
    }
    catch (error){
    console.log(error)
    }
})
router.get("/:id",async(req,res)=>{
    try{
        const  result= await product.findById(req.params.id)
        res.send(result)
    }
    catch (error){
    console.log(error)
    }
})
router.post("/",upload("products").single("file"),isAuth(),async(req,res)=>{
    try {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
        const newproduct=new product( req.body )
        newproduct.img=url
        await newproduct.save()
        res.send(newproduct)
 } 
     catch (error) {
     console.log(error)
 }
})
router.put("/:id",isAuth(),async(req,res)=>{
    try {
 
        const result = await product.findOneAndUpdate({_id:req.params.id},{...req.body},{new:true})
        res.send(result)
        console.log(result)
       
 } 
     catch (error) {
     console.log(error)
 }
})

router.delete("/:id",isAuth(),async(req,res)=>{
    try{
    const result=await product.findOneAndDelete({_id:req.params.id})
    res.send(result)
}
    catch (error) {
      console.log(error)
}}
)

module.exports= router