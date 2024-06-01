import { categoryModel } from '../../../../DB/modle/category.modle.js';
import { subcategoryModel } from '../../../../DB/modle/subcategory.modle.js';
import { asyncHandler }from './../../../middleware/asyncHandling.js';
import cloudinary from './../../../services/cloudinary.js';
import slugify from 'slugify'
import { pagination } from '../../../services/pagination.js';


export const createsubCategory =asyncHandler(
    
    async(req,res,next)=>{
        if(!req.file){
            next(new Error("image is required",{cause:400}))
        }else{
            const {categoryId}=req.params
            const category =await categoryModel.findById(categoryId)
            if(!category){
                next(Error("fail to add category",{cause:400}))
            }else{
                const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
                    {folder:`ecommerce/subcategory/${categoryId}`})
                 const {name}=req.body;
                 const slug=slugify(name);
                 const subcategory =await subcategoryModel.create({image:secure_url,name,imagePublicId:public_id,slug,createdBy:req.user._id,categoryId:categoryId})
            if(!subcategory){
                next(Error("fail to add category",{cause:400}))
            }else{
                res.status(200).json({message:"success",subcategory})
            }
                } 
        }
    }
)

export const updatesubCategory=asyncHandler(
    async (req,res,next)=>{ 
    const {id,categoryId}=req.params
        
        //هون في عندي حالتين حالة اذا في فايل وحالة اذا جاي يعدل الاسم بس
       const sub=await subcategoryModel.findById(id);
       if (!sub) {
        next(Error("sub category not found",{cause:404}))
       }
       else{
        if(req.file){
            const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`ecommerce/subcategory/${categoryId}`})
            req.body.image=secure_url //add image to req body نفس اسم الي بالداتا بيس'
            req.body.imagePublicId=public_id 
        }
           if(req.body.name){
               req.body.slug=slugify(req.body.name);
           }
            const subcategory =await subcategoryModel.findOneAndUpdate({_id:id,categoryId:categoryId},req.body,{new:false})
            //req.file =>هاي فيها الاسم والصورة والسلغ
            if(req.file){
              await cloudinary.uploader.destroy(subcategory.imagePublicId) //هاي للحذف
            }
            if(!subcategory){
                next(Error("fail to add category",{cause:400}))
            }else{
                res.status(200).json({message:"created category successfully addea",subcategory})
            }
        }
  
    }
    
    )

 export const getAllsubCategory =asyncHandler(
    async (req,res,next)=>{
        const {page,size}=req.query;
        const{skip,limit}= pagination(page,size)
        const subcategory = await subcategoryModel.find({}).limit(limit).skip(skip).populate({
            path:"createdBy",
            select:"userName image"
        }).select("image name")
        if(!subcategory){
            next(Error("fail ",{cause:400}))
        }else{
            res.status(200).json({message:"success",subcategory})
        }
    }
 )  
 
 export const getsubcat =asyncHandler(
    async(req,res,next) => {
       const {id}=req.params;
       const subcategory= await subcategoryModel.findOne({_id:id}).populate({
        path:"createdBy",
            select:"userName"
       });
       if(!subcategory){
        next(Error("fail ",{cause:400}))
         }else{
        res.status(200).json({message:"success",subcategory})
         }
    })