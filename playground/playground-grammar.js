const { DefinitionSyntax, buildMatchGraph } = require('../dist/index.js')
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
// const syntax = `
// [a b | c || d && e f]
// `
const syntax = `
A  B  C
`

console.log('===== Input =====')
console.log(syntax)
console.log('=================')

const tok = DefinitionSyntax.parse({ text: syntax })

// function print(src, node) {
// 	if (node.spot) {
// 		const location = {
// 			start: { line: node.spot.lneIni, column: node.spot.colIni },
// 			end: { line: node.spot.lneEnd, column: node.spot.colEnd },
// 		}

// 		const type = grammar.SyntaxKindText[node.kind]
// 		const kind = node.kind
// 		const comb = node.comb ? grammar.SyntaxCombinatorKindText[node.comb] : void 0
// 		const data = JSON.parse(JSON.stringify({ type, kind, comb }))
// 		const info = Object.entries(data)
// 			.map(t => `${t[0]}: ${t[1]}`)
// 			.join('; ')

// 		const result = codeFrameColumns(src, location, {
// 			highlightCode: true,
// 			linesAbove: 1,
// 			linesBelow: 1,
// 			message: `
//       ↖\n    | ${info}
//       `.trim(),
// 		})

// 		console.log(result, '\n')
// 	}
// 	if (Array.isArray(node.body)) {
// 		node.body.forEach(n => print(src, n))
// 	} else if (typeof node.node === 'object' && node.node) {
// 		print(src, node.node)
// 	}
// }

// print(syntax, tok)

function compact(node) {
	delete node.spot
	if (Array.isArray(node.body)) {
		node.body.map(compact)
	} else if (node.node) compact(node.node)
}
compact(tok)

const graph = buildMatchGraph(tok)

function getName(n) {
	return n.name || n.kind
}
function logIf(g, pad = 0) {
	const w = '  '.repeat(pad)
	let str = [`if (match('${getName(g.match)}')) ` + logOne(g.then, pad), `else ` + logOne(g.else, pad)]
	return str.map(v => `${w}${v}`).join('\n')
}
function logOne(n, p) {
	if (n.kind === 'If') {
		return '\n' + logIf(n, p + 1)
	} else {
		const name = getName(n)
		if (name === 'Mismatch') return `throw Error('Mismatch')`
		return `return 1`
	}
}

console.dir(tok, { depth: 100 })
console.dir(graph, { depth: 100 })
const code = '\n\n' + logIf(graph) + '\n\n'
const frame = codeFrameColumns(code, { start: 0, end: code.length }, { highlightCode: true })

console.log(frame)

// A double ampersand (&&) separates two or more components, all of which must occur, in any order.
const items = [ 'B', 'D']

function ampersand(items) {
	const ENUM = { A: 0, B: 0, C: 0, D: 0 }
	const keys = Object.keys(ENUM)

	const early = items.find(i => {
		if (i in ENUM) {
			ENUM[i]++
		} else return true
	})

	if (early) return `Unknown value "${early}"`

	return keys.every(k => ENUM[k] === 1) ? 'Match' : 'Expected ' + keys.filter(k => ENUM[k] !== 1).join(' && ')
}
console.log(ampersand(items))
