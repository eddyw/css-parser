import { TOKEN, TYPE } from '~/constants'
import type { TokenizerContext } from './types'

export function createContext(css: string): TokenizerContext {
	const context: TokenizerContext = {
		source: css,
		sourceSize: css.length,
		charAt0: TOKEN.EOF,
		charAt1: TOKEN.EOF,
		charAt2: TOKEN.EOF,
		charAt3: TOKEN.EOF,
		tokenType: TYPE.EOF,
		tokenOpen: 0,
		tokenShut: 0,
		tokenLead: 0,
		tokenTail: 0,
		tokenFlag: 0,
		setCodePointAtCurrent() {
			const posAt0 = this.tokenShut
			const posAt1 = posAt0 + 1
			const posAt2 = posAt0 + 2
			const posAt3 = posAt0 + 3

			this.charAt0 = posAt0 >= this.sourceSize ? TOKEN.EOF : this.source.charCodeAt(posAt0)
			this.charAt1 = posAt1 >= this.sourceSize ? TOKEN.EOF : this.source.charCodeAt(posAt1)
			this.charAt2 = posAt2 >= this.sourceSize ? TOKEN.EOF : this.source.charCodeAt(posAt2)
			this.charAt3 = posAt3 >= this.sourceSize ? TOKEN.EOF : this.source.charCodeAt(posAt3)
		},
	}

	return context
}
