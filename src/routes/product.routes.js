import { Router } from "express"
import { getProduct,updateStock,getAllProducts,deleteProduct,updateProduct,addProduct,getProductTypeEnums } from "../controllers/product.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const productRouter=Router();


productRouter.route("/getProductType").get(getProductTypeEnums)
productRouter.route("/getAllProduct").get(getAllProducts)

productRouter.route("/getProduct").post(getProduct)
productRouter.route("/updateStock").post(updateStock)
productRouter.route("/deleteProduct").post(deleteProduct)
productRouter.route("/updateProduct").post(updateProduct)

productRouter.route("/addProduct").post(
    upload.single("image"),
    addProduct)


export default productRouter