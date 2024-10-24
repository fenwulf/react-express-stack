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
    // Create Song table
    db.run(`CREATE TABLE IF NOT EXISTS Song (
      song_id INTEGER PRIMARY KEY AUTOINCREMENT,
      song_title TEXT NOT NULL
    )`);

    // Create Album table
    db.run(`CREATE TABLE IF NOT EXISTS Album (
      album_id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_name TEXT NOT NULL,
      release_date DATE
    )`);

    // Create Artist table
    db.run(`CREATE TABLE IF NOT EXISTS Artist (
      artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
      artist_name TEXT NOT NULL,
      is_alive BOOLEAN
    )`);

    // Create Album_Artist join table
    db.run(`CREATE TABLE IF NOT EXISTS Album_Artist (
      album_id INTEGER,
      artist_id INTEGER,
      PRIMARY KEY (album_id, artist_id),
      FOREIGN KEY (album_id) REFERENCES Album(album_id),
      FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
    )`);

    // Create Song_Album join table
    db.run(`CREATE TABLE IF NOT EXISTS Song_Album (
      song_id INTEGER,
      album_id INTEGER,
      PRIMARY KEY (song_id, album_id),
      FOREIGN KEY (song_id) REFERENCES Song(song_id),
      FOREIGN KEY (album_id) REFERENCES Album(album_id)
    )`);

    // Create Song_Artist join table
    db.run(`CREATE TABLE IF NOT EXISTS Song_Artist (
      song_id INTEGER,
      artist_id INTEGER,
      is_main_artist BOOLEAN,
      PRIMARY KEY (song_id, artist_id),
      FOREIGN KEY (song_id) REFERENCES Song(song_id),
      FOREIGN KEY (artist_id) REFERENCES Artist(artist_id)
    )`);

    // Create Rating table
    db.run(`CREATE TABLE IF NOT EXISTS Rating (
      rating_id INTEGER PRIMARY KEY AUTOINCREMENT,
      rating_value INTEGER CHECK (rating_value BETWEEN 1 AND 5),
      ratable_id INTEGER,
      ratable_type TEXT CHECK (ratable_type IN ('song', 'album')),
      rating_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Database initialized with music schema');

    // Insert example entries
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Song (song_title) VALUES ('Song A'), ('Song B')`);
    db.run(`INSERT INTO Album (album_name, release_date) VALUES ('Album X', '2024-01-01'), ('Album Y', '2024-02-01')`);
    db.run(`INSERT INTO Artist (artist_name, is_alive) VALUES ('Artist 1', 1), ('Artist 2', 0)`);

    // Insert into join tables
    db.run(`INSERT INTO Album_Artist (album_id, artist_id) VALUES (1, 1), (2, 2)`);
    db.run(`INSERT INTO Song_Album (song_id, album_id) VALUES (1, 1), (2, 2)`);
    db.run(`INSERT INTO Song_Artist (song_id, artist_id, is_main_artist) VALUES (1, 1, 1), (2, 2, 0)`);
    
    // Insert ratings (ratable_id and ratable_type correspond to songs/albums)
    db.run(`INSERT INTO Rating (rating_value, ratable_id, ratable_type, rating_date) VALUES 
      (5, 1, 'song', '2024-10-20'), 
      (4, 2, 'album', '2024-10-21')`);

    console.log('Inserted example entries');
  });
}


module.exports = db;
