import Database from 'better-sqlite3'

const db = new Database(':memory:')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
  );

  INSERT INTO photos (title, url) VALUES
    ('Sunset Beach', '/img/sunset.jpg'),
    ('Mountain Hike', '/img/mountain.jpg'),
    ('City Lights', '/img/city.jpg');
`)

export default db
