const fs = require('fs')
const { tokenizer, createContext } = require('../dist/index.cjs')

// const css = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })
const css = fs.readFileSync(require.resolve('tailwindcss/dist/tailwind.css'), { encoding: 'utf-8' })

const host = tokenizer(createContext(css))

let token = null // host.consumeToken()
const tokens = []

do {
	token = host.consumeToken()
	tokens.push(css.slice(token.spot.offsetIni, token.spot.offsetEnd))
} while(!host.isDone())
