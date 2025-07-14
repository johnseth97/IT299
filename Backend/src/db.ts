import Database from 'better-sqlite3'

const db = new Database(':memory:')

db.exec(`
  -- Tables
  CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY, -- UUID
    customer_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS service_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    cost REAL NOT NULL,
    description TEXT DEFAULT '',
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    service_type_id INTEGER NOT NULL,
    photo_url TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (service_type_id) REFERENCES service_types(id)
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );

  -- Seed Photos
  INSERT INTO photos (title, url) VALUES
    ('Sunset Beach', '/img/sunset.jpg'),
    ('Mountain Hike', '/img/mountain.jpg'),
    ('City Lights', '/img/city.jpg');

  -- Seed Categories
  INSERT INTO categories (name, description) VALUES
    ('Prints', 'Standard and specialty photo prints'),
    ('Photo Edits', 'Digital enhancements and corrections'),
    ('Film Services', 'Analog film development and recovery');

  -- Seed Service Types
  INSERT INTO service_types (name, cost, description, category_id) VALUES
    -- Prints
    ('Keychain Print', 4.99, 'Small print for keychain display', 1),
    ('Wallet Print', 5.99, 'Perfect size for wallets and lanyards', 1),
    ('Postcard Print', 6.99, 'Standard 4x6 postcard format', 1),
    ('A4 Print', 9.99, 'A4-sized photo paper print', 1),
    ('Poster Print', 19.99, 'Large wall poster', 1),

    -- Photo Edits
    ('Touch-up', 9.99, 'Minor blemish removal and lighting correction', 2),
    ('Composition Change', 14.99, 'Change backgrounds or merge photos', 2),
    ('Advanced Photoshop', 24.99, 'Complex retouching with effects', 2),

    -- Film Services
    ('Negative Development', 0.99, 'Develop 35mm film negatives (per negative)', 3),
    ('Photograph Recovery', 29.99, 'Mail-in service for damaged photo recovery', 3);
`)

export default db
