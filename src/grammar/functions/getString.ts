import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '../shared'
import type { GrammarNodeString } from '~/grammar/shared'

const up = Error('Unclosed string')

export function getString(x: GrammarTokenizerContext): GrammarNodeString {
	const open = x.getPositionOpen()

	x.consumeCodeAt0(TOKEN.SINGLE_QUOTE)

	while (x.shut < x.size) {
		if (x.codeAt0 === TOKEN.SINGLE_QUOTE) {
			x.consume(1)

			return {
				symb: GRAMMAR_SYMB.STRING,
				node: x.code.slice(open.offIni + 1, x.shut - 1),
				spot: x.getPositionShut(open),
			}
		}
		x.consume(1)
	}

	throw up
}
