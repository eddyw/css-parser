import type { GRAMMAR_SYMB } from '~/constants'

/**
 * @todo --- remove me!
 */
export interface GrammarTokenizerContext {
	code: string
	size: number
	codeAt0: number
	codeAt1: number
	codeAt2: number
	codeAt3: number
	type: GRAMMAR_SYMB
	open: number
	shut: number
	lead: number
	tail: number
	flag: number
	setCodeAtCurrent(): void
	consumeCodeAt0(char: number): void
	consume(n: number): void
	optionSpot: boolean
	getSpot(open: number, shut: number, openLn?: number, shutLn?: number): GrammarSpot | null
	offsetLne: number
	offsetCol: number
	lastOffsetLne: number
	lastOffsetCol: number
	consumeLn(): void
}

/**
 * Tokenizer interface
 */
export interface GrammarTokenizer {
	context: GrammarTokenizerContext
	isDone(): boolean
	consumeToken(): any
}

export interface GrammarSpot {
	offsetIni?: number
	offsetEnd?: number
	startLne?: number
	startCol?: number
	endLne?: number
	endCol?: number
}
