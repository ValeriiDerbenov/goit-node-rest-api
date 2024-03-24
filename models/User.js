import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
// import emailRegexp from "../constants/user-constants.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      minlenths: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
