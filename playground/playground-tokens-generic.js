const fs = require('fs')
const path = require('path')
const { tokenizer, createContext } = require('../dist/index.cjs')

// const css = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })
// const css = fs.readFileSync(require.resolve('tailwindcss/dist/tailwind.css'), { encoding: 'utf-8' })
const css = `
url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")
url( "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")
nrl("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")
url(     /something/here )
url(/something/here)
url()
`.trimLeft()
const host = tokenizer(createContext(css))

let token = null // host.consumeToken()
const tokens = []

do {
	token = host.consumeToken()
	tokens.push(css.slice(token.spot.offsetIni, token.spot.offsetEnd))
} while(!host.isDone())

const OUT_DIR = path.resolve(__dirname, './tokens.css')
fs.writeFileSync(OUT_DIR, tokens.join('»'), { encoding: 'utf-8' })
