// "1 fragment", "3 fragments"
export function pluralize(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}
