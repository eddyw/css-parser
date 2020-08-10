const TokenizerPostCSS = require('postcss/lib/tokenize')
const { tokenizer, createContext } = require('../../dist/index.cjs')

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
function createCaseTypedCSS(css) {
	return function caseTypedCSS() {
		let count = 0
		const stream = tokenizer(createContext(css))

		do {
			stream.consumeToken()
			count++
		} while (!stream.isDone())

		counter.value = count
	}
}

/**
 * @param {import('benchmark').Suite} suite
 * @param {string} css
 */
function initializeBenchmark(suite, css) {
  counter.value = 0

  suite.add('PostCSS', createCasePostCSS(css))
  suite.add('TypedCSS', createCaseTypedCSS(css))
  suite.on('cycle', evt => evt.target.tokensCount = counter.value)
  suite.on('complete', function() {
    const result = {}
    const successful = Array.from(this.filter('successful'))

    successful.forEach(target => {
      result[target.toString()] = {
        ms: Number(((1 / target.hz) * 1000).toFixed(2)),
        tokens: target.tokensCount,
        'ms/50k': Number(((50e3 * ((1 / target.hz) * 1000)) / target.tokensCount).toFixed(2)),
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
