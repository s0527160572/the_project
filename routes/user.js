import express from "express";
const router=express.Router();
import * as userControler from "../controler/user.js"
import { authAdmin } from "../midelWares/auth.js";

router.get("/",authAdmin,userControler.getAlluser)
router.post("/login",userControler.login)
router.post("/",userControler.adduser)




export default router;