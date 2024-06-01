import { Schema,model, Types } from "mongoose";

const categorySchema = new Schema(
    {
        name:{
            type:String,
            required:[true,'username is required'],
            min:[3,'min length is 3'],
            max:[3,'max length is 25'],
            unique:[true,'categore name must be unique']
        },
      image:String,
      createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'category owner is required']
      },
      slug:String,
      imagePublicId:String,
    },{timestamps:true ,
      toJSON:{virtuals:true},
      toObject:{virtual:true}
    }
)
categorySchema.virtual("subcategory",{
  ref:'subcategory',
  localField:'_id',
  foreignField:'categoryId'
})
const categoryModel =model('category',categorySchema)
export{
    categoryModel
} 