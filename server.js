const express= require("express")
const app= express()
const port=4000
const ConnectDb=require("./config/ConnectDB")
require("dotenv").config()

const cors = require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
ConnectDb()
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json())
app.use("/api/product",require("./Route/Productroute"))
app.use("/api/user",require("./Route/Userroute"))





app.listen(port,(err)=>{
    err?console.log(err):console.log("server is running")
})