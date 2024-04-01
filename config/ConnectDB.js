const mongoose=require("mongoose")
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDb