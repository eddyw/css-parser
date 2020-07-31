import { TOKEN, TYPE } from '~/constants'

/**
 * @todo
 * 	- tokenLineOpen
 * 	- tokenLineShut
 * 	- tokenColumnOpen
 * 	- tokenColumnShut
 *  - currentLine
 *  - currentColumn ?
 */
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
	setCodePointAtCurrent(): void
}

export interface TokenizerYield {
	tokenType: TYPE
	tokenOpen: number
	tokenShut: number
	tokenTail: number
	tokenLead: number
	tokenFlag: number
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
		// prettier-ignore
		setCodePointAtCurrent() {
			context.charAt0 = context.tokenShut === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut)
			context.charAt1 = context.tokenShut + 1 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 1)
			context.charAt2 = context.tokenShut + 2 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 2)
			context.charAt3 = context.tokenShut + 3 === context.sourceSize ? TOKEN.EOF : context.source.charCodeAt(context.tokenShut + 3)
		}
	}
	return context
}
