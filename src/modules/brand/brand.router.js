import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './brand.endpoint.js';
import * as brandRouter from './controller/brand.controller.js'
import { mymulter, filevalidation } from './../../services/multer.js';
const router=Router();

 router.post('/',auth(endpoint.add),mymulter(filevalidation.image).single('image'),brandRouter.createbrand)
 router.put('/:id',auth(endpoint.update),mymulter(filevalidation.image).single('image'),brandRouter.updatebrand)
 router.get('/',brandRouter.getAllBrands)
export default router;