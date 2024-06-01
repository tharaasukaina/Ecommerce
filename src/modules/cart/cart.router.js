import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './cart.endpoint.js';
import * as cart from './controller/cart.controller.js'
import { mymulter, filevalidation } from './../../services/multer.js';
const router=Router();

 router.post('/',auth(endpoint.add),cart.addToCart)
//  router.put('/:id',auth(endpoint.update),mymulter(filevalidation.image).single('image'),brandRouter.updatebrand)
//  router.get('/',brandRouter.getAllBrands)



export default router;