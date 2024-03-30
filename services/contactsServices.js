import Contact from "../models/Contact.js";

export const listContacts = (ownerId) =>
  Contact.find({ owner: ownerId }, "-createdAt -updatedAt");

// export const addContact = async (body) => Contact.create(body);
export async function addContact(userId, { name, email, phone }) {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      owner: userId,
    });

    return {
      ...newContact._doc,
      __v: undefined,
    };
  } catch (error) {
    console.error(error.message);
  }
}

export const getContactById = (id) => Contact.findById(id);
export const removeContact = (id) => Contact.findByIdAndDelete(id);
export const updateContact = (id, body) => Contact.findByIdAndUpdate(id, body);
export const updateStatus = (id, body) => Contact.findByIdAndUpdate(id, body);
