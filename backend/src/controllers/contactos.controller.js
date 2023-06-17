const ContactosService = require("../services/contactos.service");
const AuthService = require("../services/auth.service");
let instance = null;

class ContactosController {
  static getInstance() {
    if (!instance) {
      return new ContactosController();
    }
    return instance;
  }

  async getContacts(req, res) {
    try {
      const contacts = await ContactosService.getContacts();
      return res.status(200).json(contacts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContact",
        message: err,
      });
    }
  }

  async getContactById(req, res) {
    try {
      const id = req.params.id;
      let contact = await ContactosService.getContactById(id);
      if (!contact) {
        return res.status(404).json({
          method: "getContactById",
          message: "Not Found",
        });
      }
      return res.status(200).json(contact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getContactById",
        message: err,
      });
    }
  }


  async createContact(req, res) {
    try {
      const { contact } = req.body;
      let isRegistered = await ContactosService.isContactRegistered(
        contact.email
      );
      if (!isRegistered) {
        let newContact = await ContactosService.createContact(contact);

        return res.status(201).json({
          message: "Created!",
          contact: newContact,
        });
      }
      return res.status(400).json({
        message: "The contact is already registered",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createContact",
        message: err.message,
      });
    }
  }

  async updateContact(req, res) {
    try {
      let contact = await ContactosService.getContactById(req.params.id);
      if (!contact) {
        return res
          .status(404)
          .json({ method: "updateContact", message: "Not Found" });
      }
      const modifiedContact = await ContactosService.updateContact(
        req.params.id,
        req.body,
        contact
      );
      return res.status(200).json(modifiedContact);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateContact",
        message: err,
      });
    }
  }

  async deleteContact(req, res) {
    try {
      let isContact = await ContactosService.getContactById(req.params.id);
      if (isContact) {
        await ContactosService.deleteContact(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteContact",
        message: err,
      });
    }
  }
}

module.exports = new ContactosController();
