const path = require('path')
const Database = require('better-sqlite3')

const dbPath = path.join(__dirname, 'database.db')
const db = new Database(dbPath)
db.pragma('foreign_keys = ON')
db.prepare(
  `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
    rut INTEGER NOT NULL,
    dv TEXT NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')))`,
).run()
db.prepare(
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    stock integer(10) NOT NULL)`,
).run()

module.exports = db
