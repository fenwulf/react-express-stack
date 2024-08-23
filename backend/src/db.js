const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Create the items table with some random columns, checking if it doesn't exist first, timestamp current time
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert example entries
    db.run(`INSERT INTO items (name, description) VALUES 
      ('Item 1', 'This is the first item'), 
      ('Item 2', 'This is the second item'),
      ('Item 3', 'This is the third item')`);
  });
}


module.exports = db;
