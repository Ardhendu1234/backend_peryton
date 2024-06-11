import { Router } from "express"
import { 
    getService,
    getAllServices,
    deleteService,
    updateService,
    addService} from "../controllers/service.controller.js"
import { upload } from "../middlewares/mutler.middleware.js"


const ServiceRouter=Router();


ServiceRouter.route("/getAllServices").get(getAllServices)

ServiceRouter.route("/deleteService").delete(deleteService)

ServiceRouter.route("/getService").post(getService)
ServiceRouter.route("/updateService").post(updateService)

ServiceRouter.route("/addService").post(upload.single("imageUrls"),addService)


export default ServiceRouter