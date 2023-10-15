/**
 * import the required external modules
 */


import sqlite3 from "sqlite3";
import * as dotenv from 'dotenv';
dotenv.config();

/*
* configure the database
*/
let dbPath = "contacts.db";
if (process.env.DB) {
  dbPath = process.env.DB;
}


/**
 * A type for the database connection.
 */
type Database = sqlite3.Database;

/**
 * Initializes the database connection.
 *
 * @returns A Promise that resolves to the database connection.
 */
function initializeDatabase(): Database {
  const db = new sqlite3.Database(dbPath);

  // Check if the "contacts" table exists.
  const tableInfo =  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'"
  );

  if (!tableInfo) {
    // The "contacts" table does not exist, so create it.
     db.run(`
        CREATE TABLE contacts (
          id TEXT PRIMARY KEY,
          name TEXT,
          phoneNumber TEXT
        )
      `);
  }

  return db;
}

export const db: Database = initializeDatabase();

