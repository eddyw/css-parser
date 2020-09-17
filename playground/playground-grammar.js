const { grammar } = require('../dist/index.js')
const { codeFrameColumns } = require('@babel/code-frame')

// const syntax = `
//  <calc-number-value> [ '*' <calc-number-value> | '/' <calc-number-value> ]*
// `
// const syntax = `
//   [ <custom-property-name> , <declaration-value>? ]{1,2}
// `
// const syntax = `
// [ inset? && <length>{2,4} && <color>? ]# | none
// `
// const syntax = `
// 	<number [0,∞]> [ / <number [0,∞]> ]?
// `
const syntax = `
[a b | c || d && e f]
`

const ctx = grammar.createScanner({
	text: syntax,
})
const tok = grammar.parser(ctx)

console.log('===== Input =====')
console.log(syntax)
console.log('=================')

function print(src, node) {
	if (node.spot) {
		const location = {
			start: { line: node.spot.lneIni, column: node.spot.colIni },
			end: { line: node.spot.lneEnd, column: node.spot.colEnd },
		}

		const type = grammar.SyntaxKindText[node.kind]
		const kind = node.kind
		const comb = node.comb ? grammar.SyntaxCombinatorKindText[node.comb] : void 0
		const data = JSON.parse(JSON.stringify({ type, kind, comb }))
		const info = Object.entries(data)
			.map(t => `${t[0]}: ${t[1]}`)
			.join('; ')

		const result = codeFrameColumns(src, location, {
			highlightCode: true,
			linesAbove: 1,
			linesBelow: 1,
			message: `
      ↖\n    | ${info}
      `.trim(),
		})

		console.log(result, '\n')
	}
	if (Array.isArray(node.body)) {
		node.body.forEach(n => print(src, n))
	} else if (typeof node.node === 'object' && node.node) {
		print(src, node.node)
	}
}

print(syntax, tok)
