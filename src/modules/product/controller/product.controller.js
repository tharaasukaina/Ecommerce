import {brandModel}  from '../../../../DB/modle/brand.modle.js';
import { asyncHandler }from './../../../middleware/asyncHandling.js';
import cloudinary from './../../../services/cloudinary.js';
import slugify from 'slugify'
import { pagination } from '../../../services/pagination.js';
import { productModel } from '../../../../DB/modle/product.model.js';
import {subcategoryModel }from '../../../../DB/modle/subcategory.modle.js';


export const createproduct =asyncHandler(
    async(req,res,next)=>{
     
        if(!req.files?.length){
          next(new Error('images is required',{cause:400}));
        }else{
           const {name,amount,price,discount,categoryId,subcategoryId,brandId} = req.body;
           req.body.slug =slugify(name);
           req.body.stock = amount;
           req.body.finalprice =(price -(price * ((discount || 0)/100 )) )
             
           const category= await subcategoryModel.findOne({_id:subcategoryId,categoryId})
           if(!category){
            next(Error("invalid category or sub categoryb id",{cause:400}))
        }
          const brand =await brandModel.findOne({_id:brandId})
          if(!brand){
            next(Error("invalid brand id",{cause:400}))
        }
        const images =[];
        const imagePublicIds =[];
        for (const file of req.files) {
            let{secure_url,public_id}= await cloudinary.uploader.upload(file.path, {folder:`ecommerce/products/${name}`})
               images.push(secure_url)
               imagePublicIds.push(public_id)
        }
           req.body.images = images
           req.body.imagePublicIds=imagePublicIds
           req.body.createdBy=req.user._id
           const product =await productModel.create(req.body)
           if(!product){
            next(Error("fail to add product",{cause:400}))
        }else{
            res.status(200).json({message:"success",product})
        }
        }

    })

export const updateproduct=asyncHandler(
    async (req,res,next)=>{ 
    const {id}=req.params
     let product = await productModel.findById(id);
      if(!product){
        next(Error("invalid product id",{cause:400}))
      }
      const {name,amount,price,discount,categoryId,subcategoryId,brandId}=req.body
      if(name){
         req.body.slug =slugify(name);
      }
      if(amount){
        clacStock = amount - product.solditems ;
        if(clacStock >0){
            req.body.stock 
        }else{
            req.body.stock =0;
        }
      }
      if(price && discount){
        req.body.finalprice =(price -(price * (discount/100 )) )
      }else if(price){
        req.body.finalprice =(price -(price * (product.discount /100 )) )
      }else if(discount){
        req.body.finalprice =(product.price -(product.price * (discount /100 )) )
      }
      if(categoryId && subcategoryId){
        const category =await subcategoryModel.findById({_id:subcategoryId ,categoryId})
          if(!category){
            next(Error("invalid category or subcategoryid",{cause:400}))
          }
      }
      if(brandId){
        const brand = await brandModel.findById({_id:brandId})
        if(!brand){
            next(Error("invalid brand id",{cause:400}))
          }
      }
      if(req.files.length){
        const images =[];
        const imagePublicIds =[];
        for (const file of req.files) {
            let{secure_url,public_id}= await cloudinary.uploader.upload(file.path, {folder:`ecommerce/products/${name}`})
               images.push(secure_url)
               imagePublicIds.push(public_id)
        req.body.images = images
        req.body.imagePublicIds=imagePublicIds
        }
      }
       const updateproduct =await productModel.findOneAndUpdate({_id: product._id},req.body,{new:false})

       if(updateproduct){
        for (const imageId of product.imagePublicIds) {
           await cloudinary.uploader.destroy(imageId) 
        }
        return res.status(200).json({message:"success"})
       }else{
        return next(Error((`fail to update product with id :  ${product._id}`,{cause:404})))
       }
    }
     
    )

  export const getAllProducts =asyncHandler(
    async (req,res,next)=>{
        const {page,size}=req.query;
        const{skip,limit}= pagination(page,size)

        const products = await productModel.find({}).limit(limit).skip(skip).populate([{
            path:"createdBy",
            select:"userName image"
        },{
            path:"categoryId",
            select:"name image"
        },{
            path:"subcategoryId",
            select:"name image"
        },{
            path:"brandId",
            select:"name image"
        },
    ])
        if(!products){
            next(Error("fail ",{cause:400}))
        }else{
            res.status(200).json({message:"success",products})
        }
    }
 )  
 
