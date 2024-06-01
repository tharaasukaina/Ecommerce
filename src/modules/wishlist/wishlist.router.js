import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./wishlist.endpint.js";
import * as wishlist from "./controller/wishlist.controller.js"
const router=Router({mergeParams:true});

router.patch('/',auth(endpoint.add),wishlist.add)
router.delete('/',auth(endpoint.delete),wishlist.remove)

export default router;