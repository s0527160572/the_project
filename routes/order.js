import express from "express";
import * as orderControler from "../controler/order.js"
import { auth, authAdmin } from "../midelWares/auth.js";

const router=express.Router();

router.get("/",authAdmin,orderControler.getAllorder )
router.get("/only",auth,orderControler.getorderById)
router.delete("/:id",auth,orderControler.deleteorderById)
router.post("/",auth,orderControler.addorder)
router.put("/:id",authAdmin,orderControler.updateorderById)





export default router;