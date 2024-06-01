import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './subcategory.endpoint.js';
import * as subcategoryRouter from './controller/subcategory.controller.js'
import { mymulter, filevalidation } from './../../services/multer.js';
const router=Router({mergeParams:true});

 router.post('/',auth(endpoint.add),mymulter(filevalidation.image).single('image'),subcategoryRouter.createsubCategory)
 router.put('/:id',auth(endpoint.update),mymulter(filevalidation.image).single('image'),subcategoryRouter.updatesubCategory)
 router.get('/',subcategoryRouter.getAllsubCategory)
 router.get('/:id',subcategoryRouter.getsubcat)
export default router;