import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from './coupon.endpoint.js';
import * as couponRouter from './controller/coupon.controller.js'
const router=Router();

 router.post('/',auth(endpoint.add),couponRouter.createcoupon)
router.put('/:id',auth(endpoint.update),couponRouter.updatecoupon)
router.delete('/:id',auth(endpoint.delete),couponRouter.deletecoupon)
router.get('/valid',couponRouter.getValidCoupon)

export default router;