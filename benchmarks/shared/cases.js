const TokenizerPostCSS = require('postcss/lib/tokenize')
const csstoolsTokenizer = require('@csstools/tokenizer')
const tabTokenizer = require('../../playground/concepts/parse-css').tokenize
const CSSTokenizer = require('../../dist/index').CSSTokenizer
// const { tokenizer, createSyntaxContext } = require('../../dist/index.js')

const counter = { value: 0 }

function createCasePostCSS(css) {
	return function casePostCSS() {
		let count = 0
		const tokenizer = TokenizerPostCSS({ css })

		while (!tokenizer.endOfFile()) {
			tokenizer.nextToken()
			count++
		}
		counter.value = count
	}
}
function createCSSTools(css) {
	return function casePostCSS() {
		const tokens = Array.from(csstoolsTokenizer(css))
		counter.value = tokens.length
	}
}
function createTabTokenizer(css) {
	return function casePostCSS() {
		const tokens = tabTokenizer(css)
		counter.value = tokens.length
	}
}
function createCSSTokenizer(css) {
	return function caseCSSTok() {
		const tokens = new CSSTokenizer({ css }).getTokens()
		counter.value = tokens.length
	}
}
// function createCaseTypedCSS(css) {
// 	return function caseTypedCSS() {
// 		let count = 0
// 		const stream = tokenizer(createSyntaxContext(css))

// 		do {
// 			stream.consumeToken()
// 			count++
// 		} while (!stream.isDone())

// 		counter.value = count
// 	}
// }

/**
 * @param {import('benchmark').Suite} suite
 * @param {string} css
 */
function initializeBenchmark(suite, css) {
  counter.value = 0

  // suite.add('PostCSS 8', createCasePostCSS(css))
  // suite.add('CSSTools', createCSSTools(css))
  // suite.add('parse-css', createTabTokenizer(css))
  suite.add('CSSTokenizer', createCSSTokenizer(css))
  // suite.add('TypedCSS', createCaseTypedCSS(css))
  suite.on('cycle', evt => evt.target.tokensCount = counter.value)
  suite.on('complete', function() {
    const result = {}
    const successful = Array.from(this.filter('successful'))

    successful.forEach(target => {
      result[target.toString()] = {
        ms: Number(((1 / target.hz) * 1000).toFixed(2)),
        tokens: target.tokensCount,
        // 'ms/50k': Number(((50e3 * ((1 / target.hz) * 1000)) / target.tokensCount).toFixed(2)),
      }
    })

    console.log('[Suite]', this.name)
    console.table(result)
  })

  return suite
}

module.exports = {
  initializeBenchmark
}
