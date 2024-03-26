import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

// import * as authServices from "../services/authServices.js";
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      // subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is invalid");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  const { subscription, email } = req.user;
  res.json({
    subscription,
    email,
  });
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authServices.setToken(_id);

    res.json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};
