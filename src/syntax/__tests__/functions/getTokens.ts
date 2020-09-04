import { tokenizer, createSyntaxContext } from '~'

export function getTokens(css: string) {
	const stream = tokenizer(createSyntaxContext(css))
	const tokens = []

	let i = 0
	do {
		const token = stream.consumeToken()
		tokens.push(token)
		i++
	} while (!stream.isDone() && i < 200000)

	if (i >= 200000) {
		console.error('INFINITE LOOP')
		console.log(`[%o, ..., %o, %o]`, tokens[0], tokens[tokens.length - 2], tokens[tokens.length - 1])
	} else if (i <= 50) {
		// console.dir(tokens, { depth: 100 })
	}

	return tokens
}
