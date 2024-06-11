import { Router } from "express"
import { getProduct,updateStock,getAllProducts,deleteProduct,updateProduct,addProduct,getProductTypeEnums,getAllProductNames } from "../controllers/product.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const productRouter=Router();


productRouter.route("/getProductType").get(getProductTypeEnums)
productRouter.route("/getAllProduct").get(getAllProducts)
productRouter.route("/getAllProductName").get(getAllProductNames)

productRouter.route("/getProduct").post(getProduct)
productRouter.route("/updateStock").post(updateStock)
productRouter.route("/deleteProduct").post(deleteProduct)
productRouter.route("/updateProduct").post(updateProduct)

productRouter.route("/addProduct").post(
    upload.single("imageUrls"),
    addProduct)


export default productRouter