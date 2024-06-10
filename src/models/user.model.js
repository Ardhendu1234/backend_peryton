import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const userSchema=new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

  
    password:{
        type:String,
        required:true
    },


},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})

//custom methods
userSchema.methods.isPasswordCorrect=async function(password){
   const response =await bcrypt.compare(password,this.password)
   return response
}


//accesstoken
userSchema.methods.generateAccessToken= function(){
   return jwt.sign(
    {
    _id:this._id,
    email:this._id,
    username:this.username,
    fullName:this.fullName
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRTY
   }
)
}






export const User=mongoose.model("User",userSchema)