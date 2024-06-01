import { Schema,Types,model } from "mongoose";

const userSchema = new Schema(
    {
        userName:{
            type:String,
            required:[true,'username is required'],
            min:[3,'min length is 3'],
            max:[3,'max length is 25']

        },
        email:{
            type:String,
            required:[true,'email is required'],
            unique:[true,'email exists']
        },
        password:{
            type:String,
            required:[true,'password is required'],
        },
        phone:{
            type:String
        },role:{
            type:String,
              enum:['user','Admin'],
              default:'user'
        },
        confirmEmail:{
            type:Boolean,
            default:false
        },
        Blocked:{
            type:Boolean,
            default:false
        },
        image:String,
        wishlist:{
            type:Types.ObjectId,
            ref:'product'
        }
    },{timestamps:true}
)
const userModel =model('user',userSchema)
export{
    userModel
} 