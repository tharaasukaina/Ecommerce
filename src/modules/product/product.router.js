import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './product.endpoint.js';
import * as productRouter from './controller/product.controller.js'
import { mymulter, filevalidation } from './../../services/multer.js';
import wishlistRouter from '../wishlist/wishlist.router.js'
const router=Router();

router.use("/:productId/wishlist",wishlistRouter)
router.post('/',auth(endpoint.add),mymulter(filevalidation.image).array('image',5),productRouter.createproduct)
router.put('/:id',auth(endpoint.update),mymulter(filevalidation.image).array('image',5),productRouter.updateproduct)
 router.get('/',productRouter.getAllProducts)

export default router;