import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import * as contactsService from "../services/contactsServices.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatus,
} from "../services/contactsServices.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await listContacts(owner).populate("owner", " email name");
  res.status(200).json(contacts);
});

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = updateContactSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = updateContactSchema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await updateStatus(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
