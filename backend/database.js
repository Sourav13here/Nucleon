//database.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./nucleon.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

db.serialize(() => {

  // Create new table with IST default time
  db.run(
    `CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      program TEXT,
      message TEXT NOT NULL,
      submitted_at TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("✅ Contacts table created with IST time.");
      }
    }
  );
});

module.exports = db;
