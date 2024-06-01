import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import { validation } from "../../middleware/validation.js";
import * as AuthRouter from './controller/auth.controller.js'
import * as validators from './auth.validation.js'


const router=Router();


router.post('/signup',validation(validators.signup),AuthRouter.signup)
router.get('/confirmEmail/:token',AuthRouter.confirmEmail)
router.post('/signin',validation(validators.signin),asyncHandler(AuthRouter.signin))


export default router;