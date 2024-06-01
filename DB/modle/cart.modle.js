import { Schema,model, Types } from "mongoose";

const cartSchema = new Schema(
    {
       userId:{
        type:Types.ObjectId,
        ref:'user',
        required:true
       },
       products:[{
        productId:{
            type:Types.ObjectId,
            ref:'product',
        },quantity:{
            type:Number,
            default:1
        }
       }]
      
    },{timestamps:true}
)
const cartModel =model('cart',cartSchema)
export{
    cartModel
} 