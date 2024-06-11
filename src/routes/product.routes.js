import { Router } from "express"
import { getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    getProductTypeEnums, } from "../controllers/product.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"


const productRouter=Router();


productRouter.route("/getProductType").get(getProductTypeEnums)
productRouter.route("/getAllProducts").get(getAllProducts)

productRouter.route("/deleteProduct").delete(deleteProduct)

productRouter.route("/getProduct").post(getProduct)
productRouter.route("/updateProduct").post(updateProduct)

productRouter.route("/addProduct").post(
    upload.single("imageUrls"),
    addProduct)


export default productRouter