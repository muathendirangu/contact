/**
 * import the required external modules and interfaces
 */
import express, {
    Router,
    Request,
    Response
} from 'express';
import * as dotenv from 'dotenv';
import {
    v4 as uuidv4,
} from 'uuid';
import * as ContactService from './contacts.service';
import {
    Contact
} from './contact.interface';
import {
    validateUUID
} from '../utils/validate';
/**
 *
 * import the logging middleware
 *
 */
import {
    logger
} from '../middleware/logging.middleware';
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
        logger.info(`status:${res.statusCode} => GET all contacts request completed successfully`);
    } catch (error) {
        res.status(500).send(error);
        logger.error(`status:${res.statusCode} => GET all contacts request failed with error:${error}`);
    }
});
// GET Contacts/:id
contactsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if (!validateUUID(id)) {
            logger.info(`status:${400} => GET contact by id request failed for faulty id: ${id}`);
            res.status(400).send({
                "error": "invalid id parameter"
            });
            return
        }
        const contact: Contact | null = await ContactService.findContact(id);
        if (contact) {
            const decryptedName = encryption.decrypt(contact.name);
            const decryptedPhoneNumber = encryption.decrypt(contact.phoneNumber);
            const contactResponse = {
                id: contact.id,
                name: decryptedName,
                phoneNumber: decryptedPhoneNumber,
            }
            logger.info(`status:${res.statusCode} => GET contact by id request completed successfully for id: ${id}`);
            res.status(200).send(contactResponse);
        } else {
            logger.info(` status:${404} => GET no contact with id:${id}`);
            res.status(404).send({
                "error": "Contact not found"
            });
        }
    } catch (error) {
        logger.error(` status:${res.statusCode} => GET contact by id request failed with error: ${error}`);
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
            logger.error(`status:${400} => POST new contact request failed with error: name or phone number must be provided`);
            res.status(400).send({
                "error": "name or phone number must be provided"
            });
            return
        }
        const encryptedName = encryption.encrypt(name);
        const encryptedPhoneNumber = encryption.encrypt(phoneNumber);
        const contact: Contact = {
            id: uuidv4(),
            name: encryptedName,
            phoneNumber: encryptedPhoneNumber
        }
        const newContact: Contact = await ContactService.createContact(contact);
        logger.info(`status:${res.statusCode} => POST new contact request completed successfully`);
        res.status(201).send(newContact);
        return
    } catch (error) {
        logger.error(`status:${res.statusCode} => POST new contact request failed with error: ${error}`);
        res.status(500).send(error);
        return
    }
});
// PUT Contacts/:id
contactsRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if (!validateUUID(id)) {
            logger.info(`status:${400} => PUT update contact by id request failed for faulty id: ${id}`);
            res.status(400).send({
                "error": "invalid id parameter",
            });
            return
        }
        const {
            name,
            phoneNumber
        } = req.body;
        const existingContact: Contact | null = await ContactService.findContact(id);
        if (!existingContact) {
            logger.info(`status:${res.statusCode} => PUT update contact request failed for id:${id} with error: Contact not found`);
            res.status(404).send({
                "error": "Contact not found"
            });
            return
        }
        const encryptedPhoneNumber = encryption.encrypt(phoneNumber);
        const encryptedName = encryption.encrypt(name);
        const contact: Contact = {
            id: id,
            name: encryptedName,
            phoneNumber: encryptedPhoneNumber,
        }
        const updatedContact = await ContactService.updateContact(id, contact);
        logger.info(`status:${res.statusCode} => PUT update contact request completed successfully for id: ${id}`);
        res.status(200).json(updatedContact);
        return
    } catch (error) {
        logger.error(`status:${res.statusCode} => PUT update contact request failed with error: ${error}`);
        res.status(500).send(error);
        return
    }
});
// DELETE Contacts/:id
contactsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if (!validateUUID(id)) {
            logger.info(`status:${400} => PUT update contact by id request failed for faulty id: ${id}`);
            res.status(400).send({
                "error": "invalid id parameter"
            });
            return
        }
        const contact: Contact | null = await ContactService.findContact(id);
        if (contact) {
            await ContactService.removeContact(id);
            logger.info(`status:${res.statusCode} => DELETE contact request completed successfully for id: ${id}`);
            res.sendStatus(204);
        } else {
            logger.info(` status:${404} => DELETE no contact with id:${id}`);
            res.status(404).send({
                "error": "Contact not found"
            });
        }
        return
    } catch (error) {
        logger.error(`status:${res.statusCode} => DELETE contact request failed with error: ${error}`);
        res.status(500).send(error);
        return
    }
});
