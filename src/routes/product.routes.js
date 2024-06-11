import { Router } from "express"
import { getProduct,updateStock,getAllProducts,deleteProduct,updateProduct,addProduct,getProductTypeEnums } from "../controllers/product.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const productRouter=Router();


productRouter.route("/getProduct").post(getProduct)
productRouter.route("/updateStock").post(updateStock)
productRouter.route("/getAllProduct").post(getAllProducts)
productRouter.route("/deleteProduct").post(deleteProduct)
productRouter.route("/updateProduct").post(updateProduct)
productRouter.route("/getProductType").post(getProductTypeEnums)
productRouter.route("/addProduct").post(addProduct)


export default productRouter