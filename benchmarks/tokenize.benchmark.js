const fs = require('fs')
const Benchmark = require('benchmark')
const TokenizerPostCSS = require('postcss/lib/tokenize')
const { tokenizer, createContext } = require('../dist/index.cjs')

const css = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })
const suite = new Benchmark.Suite()

let tokensCount = 0

suite.add(`PostCSS Tokenizer`, function () {
	let count = 0
	const tokenizer = TokenizerPostCSS({ css })

	while (!tokenizer.endOfFile()) {
		tokenizer.nextToken()
		count++
	}
	tokensCount = count
})
suite.add(`This Parser (NEW)`, function () {
	let count = 0
	const stream = tokenizer(createContext(css))

	do {
		stream.consumeToken()
		count++
	} while(!stream.isDone())

	tokensCount = count
})

suite.on('cycle', function (evt) {
	evt.target.tokensCount = tokensCount
})

suite.on('complete', function () {
	const result = {}

	Array.from(this.filter('successful')).forEach(target => {
		result[target.toString()] = {
			ms: Number(((1 / target.hz) * 1000).toFixed(2)),
			tokens: target.tokensCount,
		}
	})

	console.table(result)
})

suite.run()
