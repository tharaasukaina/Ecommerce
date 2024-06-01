import { Schema,model, Types } from "mongoose";

const productSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,'username is required'],
            min:[3,'min length is 3'],
            max:[3,'max length is 25'],
            unique:[true,'product name must be unique'],
            trim:true,//بشيل المسافات الي عالشمال واليمين ما بخزنها بالداتا بيس
        },
      images:[String],
      imagePublicIds:[String],
      slug:String,
      description:String,
       amount:{
        type:Number,
        default:0
      },solditems:{
        type:Number,
        default:0
      },stock:{
        type:Number,
        default:0
      },price:{
        type:Number,
        default:0
      },discount:{
        type:Number,
        default:0
      },finalprice:{
        type:Number,
        default:0
      },colors:{type:[String]},
        sizes:{type:[String],enum:['s','m','l','xl']},
      categoryId:{
        type:Types.ObjectId,
         ref:'category'  }   
      , createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'category owner is required']
      },
       subcategoryId:{
        type:Types.ObjectId,
        ref:'subcategory',
      },
      brandId:{
        type:Types.ObjectId,
        ref:'brand',
      }
    
    }
    ,{timestamps:true}
)
const productModel =model('product',productSchema)
export{
    productModel
} 