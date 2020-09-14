const { grammar, createGrammarContext } = require('../dist/index.js')

const syntax = `
a{1,2} b
`
const ctx = createGrammarContext(syntax.trim())
const tok = grammar.parser(ctx)

console.dir({ INPUT: syntax }, { compact: false })
console.dir(tok, { depth: 1000, breakLength: 90 })
