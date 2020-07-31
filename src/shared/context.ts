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
		// prettier-ignore
		setCodePointAtCurrent() {
			context.charAt0 = context.tokenShut === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut)
			context.charAt1 = context.tokenShut + 1 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 1)
			context.charAt2 = context.tokenShut + 2 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 2)
			context.charAt3 = context.tokenShut + 3 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 3)
		},
		setLineAtCurrent() {
			context.tokenLineShut += 1 // Consume « white-space »
			context.tokenColumnShut = 1
		},
	}

	return context
}
