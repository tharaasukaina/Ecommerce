import { asyncHandler }from './../../../middleware/asyncHandling.js';
import { couponModel } from '../../../../DB/modle/coupon.modle.js';
import moment from "moment";

export const createcoupon =asyncHandler(
    
    async(req,res,next)=>{
       const findcoupon =await couponModel.findOne({name:req.body.name})
        if(findcoupon){
            next(new Error("coupon name already exists"),{cause:409}) 
        }else{
           req.body.createdBy=req.user._id
           const coupon =await couponModel.create(req.body)
           if(!coupon){
            next(new Error("fail"),{cause:400}) 
           }else{
            res.status(201).json({message:"success",coupon})
           }
        }
    
    
    
    })

export const updatecoupon=asyncHandler(
    async (req,res,next)=>{ 
    const {id}=req.params
  const findcoupon = await couponModel.findOneAndUpdate({_id:id},req.body,{new:true}) 
  if(!findcoupon){
    return  next(new Error("coupon not found"),{cause:400}) 
  }else{
    return res.status(200).json({message:"success",findcoupon})
  }
    


})

export const deletecoupon=asyncHandler(
    async (req,res,next)=>{ 
    const {id}=req.params
  const findcoupon = await couponModel.findOneAndDelete({_id:id}) 
  if(!findcoupon){
    return  next(new Error("coupon not found"),{cause:400}) 
  }else{
    return res.status(200).json({message:"success",findcoupon})
  }
    


})

export const getValidCoupon=asyncHandler(
    async (req,res,next)=>{
      let now=moment()
      let data=[];
      let coupons =await couponModel.find({})
      for (const coupon of coupons) {
       let exp =coupon.expireDate
       let diff =now.diff(exp,"days") 
         if(diff<0){
          data.push(coupon)
           
        }
      }
      res.status(200).json({message:"success",data})

     })
 
