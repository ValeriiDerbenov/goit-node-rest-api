import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contact = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contact.post("save", handleSaveError);
contact.pre("findOneAndUpdate", setUpdateSettings);
contact.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contact);

export default Contact;
