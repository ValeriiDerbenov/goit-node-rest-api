import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  isValidId,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  isValidId,
  updateStatusContact
);

export default contactsRouter;
