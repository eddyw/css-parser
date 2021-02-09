const { CSSTokenizer, CSSParser, CSSTokenStream, RuleKind, Kind } = require('../dist/index')

function get(css, show) {
	if (show) {
		console.log('=== Tokens ===')
		console.dir(new CSSTokenizer({ css }).getTokens(), { showHidden: true, depth: 100 })
	}
	return new CSSTokenizer({ css })
}

function simplify(o) {
	if (Array.isArray(o)) {
		o.forEach(simplify)
	} else if (o && typeof o === 'object') {
		if ('kind' in o) o.kind = RuleKind[o.kind] || Kind[o.kind]
		if ('body' in o) simplify(o.body)
		if ('prelude' in o) simplify(o.prelude)
	}
}
function log(tokenizer, fn) {
	console.log('\n=== Input ===')
	console.log(tokenizer.text)
	console.log('\n=== Parsed ===')
	const result = CSSParser[fn](new CSSTokenStream(tokenizer.getTokens()))

	simplify(result)

	console.dir(result, { depth: 100 })
	return result
}

// const cssComponentValue = `red`
// log(get(cssComponentValue), 'parseComponentValue')

// const cssComponentValueList = `1px solid green`
// log(get(cssComponentValueList), 'parseComponentValueList')

// const cssDeclaration = `color: hotpink`
// log(get(cssDeclaration), 'parseDeclaration')

// const cssDeclarationList = `
// color: hotpink;
// `
// log(get(cssDeclarationList), 'parseDeclarationList')

// const cssParseRule__At = `
// @media(width: 200px) {
//   .c {
//     color: red;
//   }
// }`
// log(get(cssParseRule__At), 'parseRule')

// const cssParseRule__QualifiedRule = `
// .c0 {
//   color: red;
// }`
// log(get(cssParseRule__QualifiedRule), 'parseRule')

// const cssParseRuleList = `
// .c0 {
//   color: red;
// }`
// log(get(cssParseRuleList), 'parseRuleList')

const cssStyleSheet = `
.c { color: red; }
`
log(get(cssStyleSheet), 'parseStylesheet')
