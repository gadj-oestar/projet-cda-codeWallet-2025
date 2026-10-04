import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { FiCheck, FiCopy } from 'react-icons/fi'

const LANGUAGES = { bash, css, java, javascript, json, jsx, markup, php, python, sql, typescript }
Object.entries(LANGUAGES).forEach(([name, grammar]) =>
  SyntaxHighlighter.registerLanguage(name, grammar)
)

// Le tag sert à deviner le langage ("js", "react", "html"…). JavaScript par défaut.
const TAG_ALIASES = {
  js: 'javascript',
  node: 'javascript',
  react: 'jsx',
  ts: 'typescript',
  html: 'markup',
  xml: 'markup',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  mysql: 'sql'
}

function languageFromTag(tag) {
  const key = tag.trim().toLowerCase()
  if (LANGUAGES[key]) return key
  return TAG_ALIASES[key] ?? 'javascript'
}

function CodeViewer({ code, tag }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="code-viewer">
      <button type="button" className="copy-button" onClick={copy}>
        {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
        {copied ? 'Copié' : 'Copier'}
      </button>
      <SyntaxHighlighter language={languageFromTag(tag)} style={oneDark} className="code-block">
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeViewer
