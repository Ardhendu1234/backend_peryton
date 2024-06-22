import { Router } from "express"
import { getAllServices,deleteService, addService } from "../controllers/service.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"


const serviceRouter=Router();

serviceRouter.route("/getAllServices").get(getAllServices)

serviceRouter.route("/deleteService").delete(deleteService)

serviceRouter.route("/addService").post(upload.single("imageUrls"),addService)


export default serviceRouter