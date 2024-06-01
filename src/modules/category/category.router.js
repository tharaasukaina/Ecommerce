import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './category.endpoint.js';
import * as categoryRouter from './controller/category.controller.js'
import { mymulter, filevalidation } from './../../services/multer.js';
import  subcategoryRouter  from '../subcategory/subcategory.router.js';
const router=Router();

router.use('/:categoryId/subcategory',subcategoryRouter)
router.post('/',auth(endpoint.add),mymulter(filevalidation.image).single('image'),categoryRouter.createCategory)
router.put('/:id',auth(endpoint.update),mymulter(filevalidation.image).single('image'),categoryRouter.updateCategory)
router.get('/',categoryRouter.getAllCategory)
router.get('/:id',categoryRouter.getcat)
export default router;