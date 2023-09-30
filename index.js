const express=require("express");
const app=express();
app.use(express.json());
const dotenv=require("dotenv");
dotenv.config('./.env');
app.get('/',(req,res)=>{
    res.status(200).send("Hello from server")
})
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("listening to port : ",PORT);
})

