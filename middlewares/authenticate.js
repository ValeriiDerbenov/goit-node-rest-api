import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw HttpError(401);
    }

    if (!token) {
      throw HttpError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    if (!id) {
      throw HttpError(401);
    }
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw HttpError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
