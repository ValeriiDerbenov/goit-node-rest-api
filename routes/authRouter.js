import express from "express";
import {
  sighupSchema,
  sighinSchema,
  userEmailSchema,
} from "../schemas/userSchema.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  verify,
  resendVerifyEmail,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();
authRouter.post("/register", validateBody(sighupSchema), register);
authRouter.get("/verify/:verificationCode", verify);
authRouter.post("/verify", validateBody(userEmailSchema), resendVerifyEmail);
authRouter.post("/login", validateBody(sighinSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
