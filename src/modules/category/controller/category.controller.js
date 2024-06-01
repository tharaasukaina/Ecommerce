import { categoryModel } from '../../../../DB/modle/category.modle.js';
import { asyncHandler }from './../../../middleware/asyncHandling.js';
import cloudinary from './../../../services/cloudinary.js';
import slugify from 'slugify'

import { pagination } from '../../../services/pagination.js';

export const createCategory =asyncHandler(
    
    async(req,res,next)=>{
        if(!req.file){
            next(new Error("image is required",{cause:400}))
        }else{
            const {name}=req.body;
            const slug=slugify(name);
            const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'})
            const category =await categoryModel.create({image:secure_url,name,imagePublicId:public_id,slug,createdBy:req.user._id})
            if(!category){
                next(Error("fail to add category",{cause:400}))
            }else{
                res.status(200).json({message:"created category successfully addea",category})
            }
        }
    }
)
export const updateCategory=asyncHandler(
    async (req,res,next)=>{ //هون في عندي حالتين حالة اذا في فايل وحالة اذا جاي يعدل الاسم بس
        if(req.file){
            const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/category'})
            req.body.image=secure_url //add image to req body نفس اسم الي بالداتا بيس'
            req.body.imagePublicId=public_id 
        }
            const {id}=req.params;
           if(req.body.name){
               req.body.slug=slugify(req.body.name);
           }
            const category =await categoryModel.findByIdAndUpdate(id,req.body,{new:false})
            //req.file =>هاي فيها الاسم والصورة والسلغ
            if(req.file){
              await cloudinary.uploader.destroy(category.imagePublicId) //هاي للحذف
            }
            if(!category){
                next(Error("fail to add category",{cause:400}))
            }else{
                res.status(200).json({message:"created category successfully addea",category})
            }
        }
  
    
    
    )

 export const getAllCategory =asyncHandler(
    async (req,res,next)=>{
        const {page,size}=req.query;
        const{skip,limit}= pagination(page,size)
        const category = await categoryModel.find({}).limit(limit).skip(skip).populate([{
            path:"createdBy",
            select:"userName image"
        },{
            path:"subcategory"
        }])
        if(!category){
            next(Error("fail ",{cause:400}))
        }else{
            res.status(200).json({message:"success",category})
        }
    }
 )  
 
 export const getcat =asyncHandler(
    async(req,res,next) => {
       const {id}=req.params;
       const category= await categoryModel.findOne({_id:id}).populate({
        path:"createdBy",
            select:"userName"
       });
       if(!category){
        next(Error("fail ",{cause:400}))
         }else{
        res.status(200).json({message:"success",category})
         }
    })