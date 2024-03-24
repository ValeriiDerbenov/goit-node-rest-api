import express from "express";
import isValidId from "../middlewares/isValidId.js";
import schemas from "../schemas/userSchema.js"; // {sighupSchema, sighinSchema, schemas}
import { signup, signin } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();
authRouter.post("/signup", validateBody(schemas.sighupSchema), signup);
// authRouter.post("/signin", isValidId, schemas.sighinSchema, signin);

export default authRouter;
