// import { User } from "../models/User.js"; // {User}
import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";

// import * as authServices from "../services/authServices.js";
// import * as userServices from "../services/userServices.js";

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw HttpError(401, "Email or password is wrong");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};
