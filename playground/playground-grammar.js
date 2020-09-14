const { grammar, createGrammarContext } = require('../dist/index.js')

const syntax = `
[]!
`

const ctx = createGrammarContext(syntax)
const tok = grammar.parser(ctx)

console.log('===== Input =====')
console.log(syntax)
console.log('=================')

console.dir(tok, { depth: 1000, breakLength: 90 })
