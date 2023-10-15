/**
 * import the required external modules and interfaces
 */
import express, {
  Router,
  Request,
  Response
} from 'express';
import * as dotenv from 'dotenv';
import * as ContactService from './contacts.service';
import {
  Contact
} from './contact.interface';
/**
*
* import encryption middleware
*
*/
import Encryption from '../middleware/encryption.middleware';
dotenv.config();
/***
*
* Initialize the encryption middleware
*
* ***/
const encryption = new Encryption({
  algorithm: process.env.ALGORITHM,
  encryptionKey: process.env.ENCRYPTION_KEY,
});
/**
* Router Definition
*/
export const contactsRouter: Router = express.Router();
/**
* request handlers definitions
*/
// GET Contacts
async function decryptContacts(contactsData: Contact[]): Promise < Contact[] > {
  const decryptedContacts: Contact[] = [];
  for (const contact of contactsData) {
      const name = encryption.decrypt(contact.name);
      const phoneNumber = encryption.decrypt(contact.phoneNumber);
      decryptedContacts.push({
          id: contact.id,
          name,
          phoneNumber,
      });
  }
  return decryptedContacts;
}
contactsRouter.get('/', async (req: Request, res: Response) => {
  try {
      const contacts: Contact[] = await ContactService.findAllContacts();
      const contactsResponse = await decryptContacts(contacts);
      res.status(200).send(contactsResponse);
  } catch (error) {
      res.status(500).send(error);
  }
});
// GET Contacts/:id
contactsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
      const contact: Contact | null = await ContactService.findContact(id);
      if (contact) {
          const decryptedName = encryption.decrypt(contact.name);
          const decryptedPhoneNumber = encryption.decrypt(contact.phoneNumber);
          const contactResponse = {
              id: contact.id,
              name: decryptedName,
              phoneNumber: decryptedPhoneNumber,
          }
          res.status(200).send(contactResponse);
      } else {
          res.status(404).send("contact not found");
      }
  } catch (error) {
      res.status(500).send(error);
  }
});
// POST Contacts
contactsRouter.post('/', async (req: Request, res: Response) => {
  try {
      const {
          name,
          phoneNumber
      } = req.body;
      if (name.length == 0 || phoneNumber.length == 0) {
          res.status(400).send({
              "error": "name or phone number must be provided"
          });
      }
      const encryptedName = encryption.encrypt(name);
      const encryptedPhoneNumber = encryption.encrypt(phoneNumber);
      const contact: Contact = {
          id: Date.now(),
          name: encryptedName,
          phoneNumber: encryptedPhoneNumber
      }
      const newContact: Contact = await ContactService.createContact(contact);
      res.status(201).send(newContact);
  } catch (error) {
      res.status(500).send(error);
  }
});
// PUT Contacts/:id
contactsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
      const {
          name,
          phoneNumber
      } = req.body;
      const existingContact: Contact | null = await ContactService.findContact(id);
      if (existingContact == null) {
          res.status(404).send({
              "error": "Contact not found"
          });
      }
      const encryptedPhoneNumber = encryption.encrypt(phoneNumber);
      const encryptedName = encryption.encrypt(name);
      const contact: Contact = {
          id: id,
          name: encryptedName,
          phoneNumber: encryptedPhoneNumber,
      }
      const updatedContact = await ContactService.updateContact(id, contact);
      return res.status(200).json(updatedContact);
  } catch (error) {
      res.status(500).send(error);
  }
});
// DELETE Contacts/:id
contactsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
      const id: number = parseInt(req.params.id, 10);
      await ContactService.removeContact(id);
      res.sendStatus(204);
  } catch (error) {
      res.status(500).send(error);
  }
});
