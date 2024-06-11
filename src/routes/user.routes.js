import { Router } from "express";
import { logOutUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();


router.route("/login").post(loginUser)

//secured routes
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJWT,logOutUser)


export default router