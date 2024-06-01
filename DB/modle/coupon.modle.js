import { Schema,model, Types } from "mongoose";

const couponSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,'username is required'],
            min:[3,'min length is 3'],
            max:[3,'max length is 25'],
            unique:[true,'brand name must be unique'],
            trim:true,
        },
       createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'brand owner is required']
      },
      usedBy:[{
        type:Types.ObjectId,
        ref:'user',
      }],
      expireDate:Date,
      amount:{
        type:Number,
        max:[100,"max is 100%"],
        min:[1,"min is 1%"]
      }
      
      
    },{timestamps:true}
)
const couponModel =model('coupon',couponSchema)
export{
    couponModel
} 