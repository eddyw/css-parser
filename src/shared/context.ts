import { TOKEN, SYNTAX_SYMB } from '~/constants'
import type { TokenizerContext } from './types'

export function createContext(css: string): TokenizerContext {
	const context: TokenizerContext = {
		code: css,
		size: css.length,
		codeAt0: TOKEN.EOF,
		codeAt1: TOKEN.EOF,
		codeAt2: TOKEN.EOF,
		codeAt3: TOKEN.EOF,
		type: SYNTAX_SYMB.END_OF_FILE,
		open: 0,
		shut: 0,
		lead: 0,
		tail: 0,
		flag: 0,
		setCodeAtCurrent() {
			const posAt0 = this.shut
			const posAt1 = posAt0 + 1
			const posAt2 = posAt0 + 2
			const posAt3 = posAt0 + 3

			this.codeAt0 = posAt0 >= this.size ? TOKEN.EOF : this.code.codePointAt(posAt0)!
			this.codeAt1 = posAt1 >= this.size ? TOKEN.EOF : this.code.codePointAt(posAt1)!
			this.codeAt2 = posAt2 >= this.size ? TOKEN.EOF : this.code.codePointAt(posAt2)!
			this.codeAt3 = posAt3 >= this.size ? TOKEN.EOF : this.code.codePointAt(posAt3)!
		},
	}

	return context
}
