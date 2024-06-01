import {brandModel}  from '../../../../DB/modle/brand.modle.js';
import { asyncHandler }from './../../../middleware/asyncHandling.js';
import cloudinary from './../../../services/cloudinary.js';
import slugify from 'slugify'
import { pagination } from '../../../services/pagination.js';
import { cartModel } from '../../../../DB/modle/cart.modle.js';


export const addToCart =asyncHandler(
    
    async(req,res,next)=>{
      const {_id}=req.user;
      const {products}=req.body;
      const findCart =await cartModel.findOne({userId:_id}) 
        if(!findCart){
            const cart = await cartModel.create({userId:_id,products})
            return res.status(200).json({message:"success",cart})
        }else{
            for (const product of products){
                let match=false;
                for(let i=0;i<findCart.products.length;i++){
                if(product.productId == findCart.products[i].productId){
                    findCart.products[i]=product;
                    match=true
                    break
                }
                }
                if(!match){
                   findCart.products.push(product)  
                }
                
            }
            const updateCart =await cartModel.findByIdAndUpdate({userId:_id},{products:findCart.products})
             res.status(200).json({message:"success",updateCart})
           
        }
    
    
    })

export const updatebrand=asyncHandler(
    async (req,res,next)=>{ 
    const {id}=req.params
        //هون في عندي حالتين حالة اذا في فايل وحالة اذا جاي يعدل الاسم بس
       const brand=await brandModel.findById(id);
       if (!brand) {
        next(Error("brand not found",{cause:404}))
       }
       else{
        if(req.file){
            const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
                {folder:`ecommerce/brand`})
            req.body.image=secure_url //add image to req body نفس اسم الي بالداتا بيس'
            req.body.imagePublicId=public_id 
        }
           if(req.body.name){
               req.body.slug=slugify(req.body.name);
           }
            const brand =await brandModel.findOneAndUpdate({_id:id},req.body,{new:false})
            //req.file =>هاي فيها الاسم والصورة والسلغ
            if(req.file){
              await cloudinary.uploader.destroy(brand.imagePublicId) //هاي للحذف
            }
            if(!brand){
                next(Error("fail to add category",{cause:400}))
            }else{
                res.status(200).json({message:"created category successfully addea",brand})
            }
        }
  
    }
    
    )

 export const getAllBrands =asyncHandler(
    async (req,res,next)=>{
        const {page,size}=req.query;
        const{skip,limit}= pagination(page,size)
        const brand = await brandModel.find({}).limit(limit).skip(skip).populate({
            path:"createdBy",
            select:"userName image"
        })
        if(!brand){
            next(Error("fail ",{cause:400}))
        }else{
            res.status(200).json({message:"success",brand})
        }
    }
 )  
 
