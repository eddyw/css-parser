import type { NODE_SYMB, NODE_TYPE } from '~/constants'

/**
 * Tokenizer context
 * @description
 *
 * This is mutable object which contains information about the current state of the
 * tokenizer.
 *
 * This is similar to `this` keyword but instead of binding the context to `this`,
 * it is passed an as argument to all consume algorithms
 */
export interface TokenizerContext {
	code: string
	size: number
	codeAt0: number
	codeAt1: number
	codeAt2: number
	codeAt3: number
	type: NODE_SYMB
	open: number
	shut: number
	lead: number
	tail: number
	flag: number
	setCodeAtCurrent(): void
}

/**
 * Tokenizer interface
 */
export interface Tokenizer {
	context: TokenizerContext
	isDone(): boolean
	consumeToken(): CSSToken
}

/**
 * Token Position Interface
 */
export interface CSSAtomPosition {
	offsetIni?: number
	offsetEnd?: number
	offsetLne?: number
	offsetCol?: number
}

/**
 * CSS Tokens
 * @description
 * These are the human-readable and smallest representation of a token
 */

export interface CSSEndOfFile {
	type: NODE_TYPE.END_OF_FILE
	symb: NODE_SYMB.END_OF_FILE
	flag: number
	node: string
	spot: CSSAtomPosition
}
export interface CSSAtKeyword {
	type: NODE_TYPE.AT_KEYWORD_TOKEN
	symb: NODE_SYMB.AT_KEYWORD_TOKEN
	flag: number
	node: string
	open: '@'
	spot: CSSAtomPosition
}
export interface CSSCDC {
	type: NODE_TYPE.CDC_TOKEN
	symb: NODE_SYMB.CDC_TOKEN
	flag: number
	node: '-->'
	spot: CSSAtomPosition
}
export interface CSSCDO {
	type: NODE_TYPE.CDO_TOKEN
	symb: NODE_SYMB.CDO_TOKEN
	flag: number
	node: '<!--'
	spot: CSSAtomPosition
}
export interface CSSColon {
	type: NODE_TYPE.COLON_TOKEN
	symb: NODE_SYMB.COLON_TOKEN
	flag: number
	node: ':'
	spot: CSSAtomPosition
}
export interface CSSComma {
	type: NODE_TYPE.COMMA_TOKEN
	symb: NODE_SYMB.COMMA_TOKEN
	flag: number
	node: ','
	spot: CSSAtomPosition
}
export interface CSSComment {
	type: NODE_TYPE.COMMENT_TOKEN
	symb: NODE_SYMB.COMMENT_TOKEN
	flag: number
	node: string
	open: '/*'
	shut: '*/' | ''
	spot: CSSAtomPosition
}
export interface CSSDelimiter {
	type: NODE_TYPE.DELIMITER_TOKEN
	symb: NODE_SYMB.DELIMITER_TOKEN
	flag: number
	node: string
	code: number
	spot: CSSAtomPosition
}
export interface CSSDimension {
	type: NODE_TYPE.DIMENSION_TOKEN
	symb: NODE_SYMB.DIMENSION_TOKEN
	flag: number
	node: string
	unit: string
	spot: CSSAtomPosition
}
export interface CSSFunctionToken {
	type: NODE_TYPE.FUNCTION_TOKEN
	symb: NODE_SYMB.FUNCTION_TOKEN
	flag: number
	node: string
	shut: '('
	spot: CSSAtomPosition
}
export interface CSSHash {
	type: NODE_TYPE.HASH_TOKEN
	symb: NODE_SYMB.HASH_TOKEN
	flag: number
	node: string
	open: '#'
	spot: CSSAtomPosition
}
export interface CSSIdentifier {
	type: NODE_TYPE.IDENT_TOKEN
	symb: NODE_SYMB.IDENT_TOKEN
	flag: number
	node: string
	spot: CSSAtomPosition
}
export interface CSSNumber {
	type: NODE_TYPE.NUMBER_TOKEN
	symb: NODE_SYMB.NUMBER_TOKEN
	flag: number
	node: string /** @todo - store node as numeric value (parseFloat?) */
	spot: CSSAtomPosition
}
export interface CSSOpenCurlyBrace {
	type: NODE_TYPE.OPEN_CURLY_BRACE_TOKEN
	symb: NODE_SYMB.OPEN_CURLY_BRACE_TOKEN
	flag: number
	node: '{'
	spot: CSSAtomPosition
}
export interface CSSOpenParenthesis {
	type: NODE_TYPE.OPEN_PARENTHESIS_TOKEN
	symb: NODE_SYMB.OPEN_PARENTHESIS_TOKEN
	flag: number
	node: '('
	spot: CSSAtomPosition
}
export interface CSSOpenSquareBracket {
	type: NODE_TYPE.OPEN_SQUARE_BRACKET_TOKEN
	symb: NODE_SYMB.OPEN_SQUARE_BRACKET_TOKEN
	flag: number
	node: '['
	spot: CSSAtomPosition
}
export interface CSSPercentage {
	type: NODE_TYPE.PERCENTAGE_TOKEN
	symb: NODE_SYMB.PERCENTAGE_TOKEN
	flag: number
	node: string
	unit: '%'
	spot: CSSAtomPosition
}
export interface CSSSemicolon {
	type: NODE_TYPE.SEMICOLON_TOKEN
	symb: NODE_SYMB.SEMICOLON_TOKEN
	flag: number
	node: ';'
	spot: CSSAtomPosition
}
export interface CSSShutCurlyBrace {
	type: NODE_TYPE.SHUT_CURLY_BRACE_TOKEN
	symb: NODE_SYMB.SHUT_CURLY_BRACE_TOKEN
	flag: number
	node: '}'
	spot: CSSAtomPosition
}
export interface CSSShutParenthesis {
	type: NODE_TYPE.SHUT_PARENTHESIS_TOKEN
	symb: NODE_SYMB.SHUT_PARENTHESIS_TOKEN
	flag: number
	node: ')'
	spot: CSSAtomPosition
}
export interface CSSShutSquareBracket {
	type: NODE_TYPE.SHUT_SQUARE_BRACKET_TOKEN
	symb: NODE_SYMB.SHUT_SQUARE_BRACKET_TOKEN
	flag: number
	node: ']'
	spot: CSSAtomPosition
}
export interface CSSString {
	type: NODE_TYPE.STRING_TOKEN
	symb: NODE_SYMB.STRING_TOKEN
	flag: number
	node: string
	open: `"` | `'`
	shut: `"` | `'` | ''
	spot: CSSAtomPosition
}
export interface CSSUrl {
	type: NODE_TYPE.URL_TOKEN
	symb: NODE_SYMB.URL_TOKEN
	flag: number
	node: string
	open: string
	shut: string
	spot: CSSAtomPosition
}
export interface CSSWhitespace {
	type: NODE_TYPE.WHITESPACE_TOKEN
	symb: NODE_SYMB.WHITESPACE_TOKEN
	flag: number
	node: string
	spot: CSSAtomPosition
}

export type CSSToken =
	| CSSEndOfFile
	| CSSWhitespace
	| CSSCDO
	| CSSCDC
	| CSSComment
	| CSSString
	| CSSHash
	| CSSNumber
	| CSSAtKeyword
	| CSSIdentifier
	| CSSDelimiter
	| CSSDimension
	| CSSPercentage
	| CSSFunctionToken
	| CSSUrl
	| CSSOpenParenthesis
	| CSSShutParenthesis
	| CSSComma
	| CSSCDC
	| CSSCDO
	| CSSColon
	| CSSSemicolon
	| CSSOpenSquareBracket
	| CSSShutSquareBracket
	| CSSOpenCurlyBrace
	| CSSShutCurlyBrace
