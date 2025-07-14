import Database from 'better-sqlite3'

const db = new Database(':memory:')

// Create tables
db.exec(`
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
    cost REAL NOT NULL
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

  INSERT INTO photos (title, url) VALUES
    ('Sunset Beach', '/img/sunset.jpg'),
    ('Mountain Hike', '/img/mountain.jpg'),
    ('City Lights', '/img/city.jpg');

  INSERT INTO service_types (name, cost, category_id, description) VALUES
    ('Full Print', 19.99),
    ('Touchup', 9.99),
    ('Photo Edit', 14.99),
    ('Small Print', 4.99),
    ('Upscale', 7.99),
    ('Large Print', 24.99)

;
`)

export default db
