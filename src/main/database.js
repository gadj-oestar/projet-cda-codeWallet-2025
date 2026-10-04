import Database from 'better-sqlite3'
import { join } from 'path'

// Le fichier SQLite est créé à côté du code compilé du processus principal.
const db = new Database(join(__dirname, 'fragment.db'))

db.prepare(
  `CREATE TABLE IF NOT EXISTS fragment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tag TEXT NOT NULL
  )`
).run()

export default db
