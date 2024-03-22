import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");
export const addContact = async (body) => Contact.create(body);
export const getContactById = (id) => Contact.findById(id);
export const removeContact = (id) => Contact.findByIdAndDelete(id);
export const updateContact = (id, body) => Contact.findByIdAndUpdate(id, body);
export const updateStatus = (id, body) => Contact.findByIdAndUpdate(id, body);
