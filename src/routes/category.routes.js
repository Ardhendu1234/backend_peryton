import { Router } from "express";
import { getAllCategory,
    deleteCategory,
    addCategory } from "../controllers/category.controller.js"

const categoryRouter=Router()

categoryRouter.route("/getAllCategory").get(getAllCategory)
categoryRouter.route("/deleteCategory").delete(deleteCategory)
categoryRouter.route("/addCategory").post(addCategory)


export default categoryRouter