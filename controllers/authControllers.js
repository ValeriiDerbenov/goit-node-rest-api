import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  findUser,
  emailUnique,
  createUser,
  setAvatar,
} from "../services/authService.js";
import fs from "fs/promises";
import path from "path";
import { resizeImage } from "../middlewares/imageHelpers.js";
import { v4 as uuidv4 } from "uuid";
import Jimp from "jimp";

// const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const tmpDir = path.resolve("tmp");
const avatarsDir = path.resolve("public/avatars");

// import * as authServices from "../services/authServices.js";
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await emailUnique(email);
    if (user) {
      throw HttpError(409, "Email is already in use");
    }

    const newUser = await createUser({ ...req.body });
    const { avatarURL } = newUser;
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
      },
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
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "230h" });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;

    Jimp.read(oldPath, (err, lenna) => {
      if (err) throw err;
      lenna.resize(250, 250).write(`${avatarsDir}\\${filename}`);
      fs.rm(oldPath);
    });
    const avatarURL = path.join("avatars", filename);

    await setAvatar(_id, avatarURL);
    return res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
