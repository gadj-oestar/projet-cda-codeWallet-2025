import Database from 'better-sqlite3';
import { join } from 'path';

// Chemin du fichier SQLite
const db = new Database(join(__dirname, 'fragment.db'), { verbose: console.log });

// Créer la table si elle n'existe pas encore
db.prepare(`
  CREATE TABLE IF NOT EXISTS fragment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tag TEXT NOT NULL
  )
`).run();

export default db;
