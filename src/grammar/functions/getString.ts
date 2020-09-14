import { TOKEN, GRAMMAR_SYMB } from '~/constants'
import type { GrammarTokenizerContext } from '~/shared/types'
import type { GrammarNodeString } from '~/grammar/shared'

const up = Error('Unclosed string')

export function getString(x: GrammarTokenizerContext): GrammarNodeString {
	let open = ++x.shut

	x.setCodeAtCurrent()

	while (x.shut < x.size) {
		if (x.codeAt0 === TOKEN.SINGLE_QUOTE) {
			x.consume(1)

			return {
				symb: GRAMMAR_SYMB.STRING,
				node: x.code.slice(open, x.shut - 1),
				spot: x.getSpot(open - 1, x.shut),
			}
		}
		x.consume(1)
	}

	throw up
}
