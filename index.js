const express=require("express")
const app=express()
require("dotenv").config()
require("./connect")
const port=process.env.PORT


const workerRouter=require("./routes/worker")
const ownerRouter=require("./routes/owner")


app.use(express.json())
app.use("/owner",ownerRouter)
app.use("/worker",workerRouter)



app.get("/",(req,res)=>{
    res.json({message:"Enter Correct URL"})
})

app.listen(port,()=>console.log("server running on :- ",port))