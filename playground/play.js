import { tokenizer } from '../dist/index.js'

const input = `
/* Some comments */
.c0[a="something] {
  border: 12e+1px solid red
  background: url(/something)
}`

console.log(`
============ [CSS Input - Values] ============
${input}
==============================================
`)

const iter = tokenizer(input)

let result = iter.next()

while (!result.done) {
	if (!result.value) continue // 🤷‍♀️ just TS typings

	const { tokenType, tokenOpen, tokenShut, tokenFlag, tokenLead, tokenTail } = result.value

	let value = input.slice(tokenOpen + tokenLead, tokenShut - tokenTail)
	const open = input.slice(tokenOpen, tokenOpen + tokenLead)
	const close = input.slice(tokenShut - tokenTail, tokenShut)

	if (tokenType === 15 /* number */ || tokenType === 17 /* dimension */ || tokenType === 16 /* percentage */) {
		value = parseFloat(value)
	}

	console.dir({
		type: tokenType,
		value,
		open,
		close,
		flags: tokenFlag.toString(2),
	})

	result = iter.next()
}
