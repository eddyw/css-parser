import type { GrammarTokenizerContext } from '~/shared/types'
import { TOKEN } from '~/constants'

export function getString(x: GrammarTokenizerContext) {
	let open = ++x.shut

	x.setCodeAtCurrent()

	while (x.shut < x.size) {
		if (x.codeAt0 === TOKEN.SINGLE_QUOTE) {
			x.shut += 1
			x.setCodeAtCurrent()

			return {
				node: x.code.slice(open, x.shut),
				open: "'",
				shut: "'",
				spot: {
					offsetIni: open,
					offsetEnd: x.shut,
				},
			}
		}
		x.setCodeAtCurrent()
		x.shut += 1
	}

	return {
		node: x.code.slice(open, x.shut),
		open: "'",
		shut: '',
		spot: {
			offsetIni: open,
			offsetEnd: x.shut,
		},
	}
}
