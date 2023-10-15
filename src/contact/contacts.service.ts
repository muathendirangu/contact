/**
 *
 * import data model interfaces
 *
 */
import { UUID } from 'crypto';
import {
  Contact
} from './contact.interface';
import {
  getContacts,
  getContact,
  insertContact,
  updateContactInfo,
  deleteContact
} from './contacts.sql';
/**
*
* define the service methods(Contacts business logic)
*
*/
export const findAllContacts = async (): Promise < Contact[] > => {
  return await getContacts();
}
export const findContact = async (id: string): Promise < Contact | null > => {
  return await getContact(id);
}
export const createContact = async (newContact: Contact): Promise < Contact > => {
  return await insertContact(newContact);
}
export const updateContact = async (id: string, updatedContact: Contact): Promise < Contact | null > => {
  return await updateContactInfo(id, updatedContact);
}
export const removeContact = async (id: string): Promise < null | void > => {
  return await deleteContact(id);
}
