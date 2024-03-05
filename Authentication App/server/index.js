const express = require('express')
const app = express()
const mongoose =require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const cookieparser = require('cookie-parser')
dotenv.config()


//Middlewares

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))
app.use(cookieparser())



//Mongoose Connection
mongoose.connect("mongodb://localhost:27017/UserData")
.then(()=>console.log("Mongodb connected !"))
.catch((e)=>console.log(`Error:-${e}`))


//Mongodb UserSchema & UserModel
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    }
})
const UserModel = mongoose.model("users",UserSchema)


//Routes

//Authentication-Routes
app.post("/signup",async(req,res)=>{
    const {username, email, password} = req.body
    const user = await UserModel.findOne({email:email})

    if(user){
        return res.json({message:"User Already Exists"})
    }
    else{
        const hashpassword = await bcrypt.hash(password,10)
        await UserModel.create({
            username:username,
            email:email,
            password:hashpassword
        }).then(()=>{
            return res.json({message:"User Signed Up"})
        })
    }
})
app.post("/signin",async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email:email})

    if(!user){
        return res.json({message:"Incorrect Email"})
    }
    else{
        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return res.json({message:"Incorrect Password"})
        }
        else{
            const token = jwt.sign({username:user.username},process.env.KEY,{expiresIn:"1h"})
            res.cookie("token", token, {httpOnly:true, maxAge:3600000})
            return res.json({message:"User Signed In"})
        }
    }
})
const verifyUser = async(req,res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.json({status:false});
        }
        else{
            const decoded = await jwt.verify(token,process.env.KEY);
            next();
        }
    }
    catch(e){
        console.log(`Error-${e}`)
    }
}
app.get("/verify",verifyUser,async(req,res)=>{
    return res.json({status:true});
})
app.get("/signout",async(req,res)=>{
    res.clearCookie("token")
    return res.json({status:true})
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port - ${process.env.PORT}`)
})