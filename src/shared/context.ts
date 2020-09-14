import { TOKEN, SYNTAX_SYMB } from '~/constants'
import type { SyntaxTokenizerContext, GrammarTokenizerContext } from './types'

export function createSyntaxContext(css: string): SyntaxTokenizerContext {
	const context: SyntaxTokenizerContext = {
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

export function createGrammarContext(css: string): GrammarTokenizerContext {
	const context: GrammarTokenizerContext = {
		code: css,
		size: css.length,
		codeAt0: TOKEN.EOF,
		codeAt1: TOKEN.EOF,
		codeAt2: TOKEN.EOF,
		codeAt3: TOKEN.EOF,
		type: 0,
		open: 0,
		shut: 0,
		lead: 0,
		tail: 0,
		flag: 0,
		optionSpot: false,
		optionType: false,
		setCodeAtCurrent() {
			const posAt0 = this.shut
			const posAt1 = posAt0 + 1
			const posAt2 = posAt0 + 2
			const posAt3 = posAt0 + 3

			this.codeAt0 = posAt0 >= this.size ? TOKEN.EOF : this.code.charCodeAt(posAt0)!
			this.codeAt1 = posAt1 >= this.size ? TOKEN.EOF : this.code.charCodeAt(posAt1)!
			this.codeAt2 = posAt2 >= this.size ? TOKEN.EOF : this.code.charCodeAt(posAt2)!
			this.codeAt3 = posAt3 >= this.size ? TOKEN.EOF : this.code.charCodeAt(posAt3)!
		},
		consumeCodeAt0(char) {
			if (this.codeAt0 === char) {
				this.shut += 1
				this.setCodeAtCurrent()
				return
			}
			throw Error(
				`Parse error: Expected token ${String.fromCharCode(char)} but instead got ${String.fromCharCode(this.codeAt0)}`,
			)
		},
		getSpot(open, shut) {
			if (this.optionSpot === true) {
				return {
					offsetIni: open,
					offsetEnd: shut,
				}
			}
			return null
		},
		consume(n) {
			this.shut += n
			this.setCodeAtCurrent()
		},
	}

	return context
}
