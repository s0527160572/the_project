import express from "express";
import * as productControler from "../controler/product.js"
import {auth, authAdmin} from "../midelWares/auth.js"

const router=express.Router();

router.get("/",productControler.getAllProduct )


router.get("/:productid",auth,productControler.getProductById)


router.delete("/:id",authAdmin,productControler.deleteProductById)


router.post("/",productControler.addProduct)


router.put("/:id",productControler.updatePoductById)



export default router;