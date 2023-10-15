/**
 * import the required external modules
 */
import {
    db
} from './db.config';
/**
 *
 * import data model interfaces
 *
 */
import {
    Contact
} from './contact.interface';


export const getContacts = async (): Promise < Contact[] > => {
    return new Promise <Contact[] > ((resolve, reject) => {
         db.all('SELECT * FROM contacts', (err, rows: Contact[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
export const getContact = async (id: string): Promise < Contact | null > => {
    return new Promise < Contact | null > ((resolve, reject) => {
        db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row: Contact | null) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
export const insertContact = async (contact: Contact): Promise < Contact > => {
    return new Promise < Contact > ((resolve, reject) => {
        db.run('INSERT INTO contacts (id, name, phoneNumber) VALUES (?, ?, ?)',
            [contact.id, contact.name, contact.phoneNumber],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(contact);
                }
            });
    });
}
export const updateContactInfo = async (id: string, updatedContact: Contact): Promise < Contact | null > => {
    return new Promise < Contact | null > ((resolve, reject) => {
        db.run('UPDATE contacts SET name = ?, phoneNumber = ? WHERE id = ?',
            [updatedContact.name, updatedContact.phoneNumber, id],
            function(err) {
                if (err) {
                    reject(err);
                } else if (this.changes === 0) {
                    resolve(null);
                } else {
                    resolve(updatedContact);
                }
            });
    });
}
export const deleteContact = async (id: string): Promise < void | null > => {
    return new Promise < void | null > ((resolve, reject) => {
        db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                resolve(null);
            } else {
                resolve();
            }
        });
    });
}
