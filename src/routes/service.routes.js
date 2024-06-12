import { Router } from "express"
import { 
    getService,
    getAllServices,
    deleteService,
    updateService,
    addService } from "../controllers/service.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"


const serviceRouter=Router();


serviceRouter.route("/getAllServices").get(getAllServices)

serviceRouter.route("/deleteService").delete(deleteService)

serviceRouter.route("/getService").post(getService)
serviceRouter.route("/updateService").post(updateService)

serviceRouter.route("/addService").post(upload.single("imageUrls"),addService)


export default serviceRouter