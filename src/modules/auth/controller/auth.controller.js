import {userModel} from './../../../../DB/modle/user.modle.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import SendEmail from './../../../services/email.js';

export const signup = async(req,res)=>{

    try{
        const {userName,email,password}=req.body;
        const user=await userModel.findOne({email}).select("email");
        if(user){
            res.status(409).json({message:"email exist"})
        }else{
            const hash = bcrypt.hashSync(password,parseInt(process.env.SALTROUNT))
            const newUser = new userModel({userName,email,password:hash})
             const token=jwt.sign({id:newUser._id},process.env.EMAILTOKEN,{expiresIn:'1h'})
            const link =`${req.protocol}://${req.headers.host}${process.env.BASEURL}auth/confirmEmail/${token}`
            const message =`<a href="${link}">Confirm Email</a>`
            const info =await SendEmail(email,"verify email",message)
            if(info.accepted.length){
               const saveduser=await newUser.save()
               res.status(201).json({message:"success",saveduser:saveduser._id})
            }else{
                res.status(404).json({message:"email rejected"})
            }
    
        }
    }catch(error){
         res.status(500).json({message:"error"})
    }
   
}
export const confirmEmail =async(req,res)=>{
     try{
           const {token}=req.params;
        const decoded =jwt.verify(token,process.env.EMAILTOKEN);
          if(!decoded){
              res.status(400).json({message:"invalid token payload"})
          }else{
              const user =await userModel.findOneAndUpdate({_id:decoded.id,confirmEmail:false}
                  ,{  confirmEmail:true })
                  if(!user){
              res.status(400).json({message:"account already confirmed"})
                 }else{
                      res.status(200).json({message:"email confirmed please login"})
                 }
         }
    }catch(error){
         res.status(500).json({message:"server error",error})
     }
}

export const signin = async(req,res,next)=>{
    
          const {email,password}= req.body;
         const user=await userModel.findOne({email})
             if(!user){
              return next(new Error("not register user",{cause:404}));
                }else{
                    if(!user.confirmEmail){
                
              return next(new Error("please confirm your email",{cause:400}));
                      }else{
                         if(user.Blocked){
                       return next(new Error("blocked account",{cause:400}));     
                            }   else{
                           const compare =await bcrypt.compare(password,user.password)
                           if(!compare){
                            return next(new Error("invalid password",{cause:400}));     

                           }else{
                              const token =jwt.sign({id:user._id},process.env.AUTHTOKEN,{expiresIn:"24h"})
                               res.status(200).json({message:"success",token})
                          } } } }       

}