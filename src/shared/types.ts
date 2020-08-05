import type { TYPE } from '~/constants'

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

export interface TokenizerReturnToken {
	tokenType: TYPE
	tokenOpen: number
	tokenShut: number
	tokenTail: number
	tokenLead: number
	tokenFlag: number
}
