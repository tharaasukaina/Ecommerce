import { Schema,model, Types } from "mongoose";

const brandSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,'username is required'],
            min:[3,'min length is 3'],
            max:[3,'max length is 25'],
            unique:[true,'brand name must be unique']
        },
      image:String,
      createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'brand owner is required']
      },
      slug:String,
      imagePublicId:String,
      
    },{timestamps:true}
)
const brandModel =model('brand',brandSchema)
export{
    brandModel
} 