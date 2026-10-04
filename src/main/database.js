import Database from 'better-sqlite3'
import { join } from 'path'

// Le fichier SQLite est créé à côté du code compilé du processus principal.
const db = new Database(join(__dirname, 'fragment.db'))

db.prepare(
  `CREATE TABLE IF NOT EXISTS fragment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tag TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT ''
  )`
).run()

// Migration : les bases créées avant l'ajout du code n'ont pas la colonne "content".
const columns = db.prepare('PRAGMA table_info(fragment)').all()
if (!columns.some((column) => column.name === 'content')) {
  db.prepare("ALTER TABLE fragment ADD COLUMN content TEXT NOT NULL DEFAULT ''").run()
}

export default db
