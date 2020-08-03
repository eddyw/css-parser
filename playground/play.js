const fs = require('fs')
// const path = require('path')
const TokenizerPostCSS = require('postcss/lib/tokenize')
const { tokenizer, createContext } = require('../dist/index.cjs')
const css = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })

// const file = 'stylesheet.css'
// const sheet = path.resolve(__dirname, file)
// const inputSheet = fs.readFileSync(sheet, { encoding: 'utf-8' })

const input = css
const tokens = []

function DoTheThing(input) {
	const stream = tokenizer(createContext(input))

	do {
		const token = stream.consumeToken()

		const {
			tokenType,
			tokenOpen,
			tokenShut,
			tokenFlag,
			tokenLead,
			tokenTail,
			tokenColumnOpen,
			tokenColumnShut,
			tokenLineOpen,
			tokenLineShut,
		} = token

		let value = input.slice(tokenOpen + tokenLead, tokenShut - tokenTail)
		let rawValue = input.slice(tokenOpen, tokenShut)
		const open = input.slice(tokenOpen, tokenOpen + tokenLead)
		const close = input.slice(tokenShut - tokenTail, tokenShut)

		if (tokenType === 15 /* number */ || tokenType === 17 /* dimension */ || tokenType === 16 /* percentage */) {
			value = parseFloat(value)
		}

		tokens.push(rawValue)
	} while (!stream.isDone())
}

DoTheThing(input)

const output = tokens.join('')

console.log({
	input: input.length,
	output: output.length,
	isEqual: input === output,
})

const tokenizerPostCSS = TokenizerPostCSS({ css: input })
console.log(tokenizerPostCSS.nextToken())
