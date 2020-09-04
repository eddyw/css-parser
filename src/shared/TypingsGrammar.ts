import type { GRAMMAR_SYMB } from '~/constants'

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
}

/**
 * Tokenizer interface
 */
export interface GrammarTokenizer {
	context: GrammarTokenizerContext
	isDone(): boolean
	consumeToken(): any
}

export interface GrammarTokenPosition {
	offsetIni?: number
	offsetEnd?: number
	offsetLne?: number
	offsetCol?: number
}

/**
 * Grammar tokens
 */
// export interface CSSGrammarEndOfFile {
// 	type: GRAMMAR_TYPE.END_OF_FILE
// 	symb: GRAMMAR_SYMB.END_OF_FILE
// 	flag: number
// 	node: ''
// 	spot: GrammarTokenPosition
// }
// export interface CSSGrammarIdentifier {
// 	type: GRAMMAR_TYPE.IDENTIFIER
// 	symb: GRAMMAR_SYMB.IDENTIFIER
// 	flag: number
// 	node: string
// 	spot: GrammarTokenPosition
// }
// export interface CSSGrammarFunction {}
