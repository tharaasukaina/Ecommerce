import jwt from 'jsonwebtoken';
import { userModel } from '../../DB/modle/user.modle.js';

 export const auth=(accessRole=[])=>{

 return async (req,res,next)=>{
    try{
        let {token}=req.headers;
        
        if(!token.startsWith(process.env.authbearertoken)){
                   res.json({message:"invalid bearer token"})
                } else{
              token=token.split(process.env.authbearertoken)[1]
               const decoded= await jwt.verify(token,process.env.AUTHTOKEN)
                  const user =await userModel.findById(decoded.id).select("role blocked");
                  if(!user){
                    res.status(401).json({message:"not register user"})
                  }else{
                     if(user.Blocked){
                       res.status(400).json({message:"user blocked"})
                     }else{
                          if(!accessRole.includes(user.role)){
                        request.status(403).json({message:"not auth user"})
                     }
                       req.user=user
                    next();
                     }
                   
                  }
           
   } }catch(error){
        res.status(500).json({message:"catch error",err:error.message})
    }
   
 }  
   }




 module.exports={auth}