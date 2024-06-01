import { userModel } from "../../../../DB/modle/user.modle.js";
import { asyncHandler } from "../../../middleware/asyncHandling.js";

export const add =asyncHandler(
    async(req,res,next)=>{
        const {productId}=req.params;
        let addTowishList =await userModel.findByIdAndUpdate(req.user._id,{
          $addToSet:{wishlist:productId}
        })
        if(!addTowishList){
            next(new Error("fail to add"),{cause:400})
        }else{
            res.status(200).json({message:"success"})
        }
    }
)
export const remove =asyncHandler(
    async(req,res,next)=>{
        const {productId}=req.params;
        let addTowishList =await userModel.findByIdAndUpdate(req.user._id,{
          $pull:{wishlist:productId}
        })
        if(!addTowishList){
            next(new Error("fail to add"),{cause:400})
        }else{
            res.status(200).json({message:"success"})
        }
    }
)