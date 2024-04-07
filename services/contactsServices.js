import Contact from "../models/Contact.js";

export const listContacts = (ownerId = {}, query = {}) =>
  Contact.find({ owner: ownerId }, "-createdAt -updatedAt", { ...query });

export const countContacts = (ownerId = {}) =>
  Contact.countDocuments({ owner: ownerId });

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

export async function getContactById(contactId, owner) {
  try {
    const contact = await Contact.findOne({ _id: contactId, owner });
    if (!contact) {
      return null;
    } else {
      return contact;
    }
  } catch (error) {
    console.error("No contact found.", error);
  }
}

export async function removeContact(contactId, owner) {
  try {
    const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(null);
  }
}

export async function updateContact(id, contact_data, owner) {
  try {
    const updated_contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      contact_data,
      { new: true }
    );
    return updated_contact;
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateStatus(id, contact_data, owner) {
  try {
    const updated_status = await Contact.findOneAndUpdate(
      { _id: id, owner },
      contact_data,
      { new: true }
    );
    return updated_status;
  } catch (error) {
    console.error(error.message);
  }
}
