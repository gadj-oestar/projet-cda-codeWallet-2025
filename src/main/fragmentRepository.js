import db from './database.js'

// Toutes les requêtes SQL sur la table "fragment" sont regroupées ici.
const statements = {
  findAll: db.prepare('SELECT * FROM fragment'),
  insert: db.prepare('INSERT INTO fragment (title, tag) VALUES (?, ?)'),
  update: db.prepare('UPDATE fragment SET title = ?, tag = ? WHERE id = ?'),
  remove: db.prepare('DELETE FROM fragment WHERE id = ?')
}

export function findAllFragments() {
  return statements.findAll.all()
}

export function createFragment({ title, tag }) {
  statements.insert.run(title, tag)
}

export function updateFragment({ id, title, tag }) {
  statements.update.run(title, tag, id)
}

export function deleteFragment(id) {
  statements.remove.run(id)
}
