const { parser, createContext, tokenizer } = require('../dist/index.cjs')

const css = `
@charset "utf-8"
`.trim()

const host = tokenizer(createContext(css))
const result = parser.consumeAtRule(host)

console.dir(result, { depth: 100 })
