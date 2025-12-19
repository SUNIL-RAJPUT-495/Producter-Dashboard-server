import { Router } from "express";
import { sendOtpController,verifyOtpController  } from "../controllers/user.controller.js";


const userRouter = Router()


userRouter.post('/register',sendOtpController)
userRouter.post('/verify-email',verifyOtpController)


export default userRouter;