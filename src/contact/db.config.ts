/**
 * import the required external modules
 */
import sqlite3 from "sqlite3";

const dbPath = "contacts.db";

/**
 *
 * initialize storage
 *
 */
export const db = new sqlite3.Database(dbPath);

db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'",
    (err, tableInfo) => {
        if (!tableInfo) {
            // The "contacts" table does not exist, so create it
            db.run(`
        CREATE TABLE contacts (
          id TEXT PRIMARY KEY,
          name TEXT,
          phoneNumber TEXT
        )
      `);
        }
    }
);
