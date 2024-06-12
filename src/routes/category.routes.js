import { Router } from "express";
import { getCategory,
    deleteCategory,
    addCategory } from "../controllers/category.controller.js"

const categoryRouter=Router()

categoryRouter.route("/getCategory").get(getCategory)
categoryRouter.route("/deleteCategory").delete(deleteCategory)
categoryRouter.route("/addCategory").post(addCategory)


export default categoryRouter