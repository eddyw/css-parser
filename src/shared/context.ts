import { TOKEN, TYPE } from '~/constants'

export interface TokenizerContext {
	source: string
	sourceSize: number
	charAt0: number
	charAt1: number
	charAt2: number
	charAt3: number
	tokenType: TYPE
	tokenOpen: number
	tokenShut: number
	tokenLead: number
	tokenTail: number
	tokenFlag: number
	tokenLineOpen: number
	tokenLineShut: number
	tokenColumnOpen: number
	tokenColumnShut: number
	setCodePointAtCurrent(): void
	setLineAtCurrent(): void
	consumeAtCurrent(n: number): void
}

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
		tokenColumnOpen: 1,
		tokenColumnShut: 1,
		tokenLineOpen: 1,
		tokenLineShut: 1,
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
		setLineAtCurrent() {
			this.tokenLineShut += 1 // Consume « white-space »
			this.tokenColumnShut = 1
		},
		consumeAtCurrent(nChars: number) {
			this.tokenShut += nChars
			this.tokenColumnShut += nChars
		},
	}

	return context
}
