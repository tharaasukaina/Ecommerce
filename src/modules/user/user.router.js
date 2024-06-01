import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpont } from './user.endpoint.js';
const router=Router();

router.get('/',auth(endpont.profile),(req,res)=>{
    res.status(200).json("okk")
})

export default router;