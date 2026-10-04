// Regroupe les fragments par tag : [{ name, count }], triés par ordre alphabétique.
export function groupByTag(fragments) {
  const counts = new Map()
  for (const { tag } of fragments) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// Garde les fragments du tag choisi (ou tous) dont le titre, le tag ou le code contient la recherche.
export function filterFragments(fragments, { search, tag }) {
  const query = search.trim().toLowerCase()
  return fragments.filter((fragment) => {
    if (tag && fragment.tag !== tag) return false
    if (!query) return true
    return [fragment.title, fragment.tag, fragment.content ?? ''].some((text) =>
      text.toLowerCase().includes(query)
    )
  })
}
