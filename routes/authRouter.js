import express from "express";
import { sighupSchema, sighinSchema } from "../schemas/userSchema.js";
import { login, logout, register } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
// import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();
authRouter.post("/register", validateBody(sighupSchema), register);
authRouter.post("/login", validateBody(sighinSchema), login);
// authRouter.get("/current", validateBody(sighinSchema), logout);

export default authRouter;
