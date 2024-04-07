import express from "express";
import { sighupSchema, sighinSchema } from "../schemas/userSchema.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();
authRouter.post("/register", validateBody(sighupSchema), register);
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
