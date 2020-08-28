import type { SYNTAX_SYMB, SYNTAX_TYPE } from '~/constants'

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
	type: SYNTAX_SYMB
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
	type: SYNTAX_TYPE.END_OF_FILE
	symb: SYNTAX_SYMB.END_OF_FILE
	flag: number
	node: string
	spot: CSSAtomPosition
}
export interface CSSAtKeyword {
	type: SYNTAX_TYPE.AT_KEYWORD_TOKEN
	symb: SYNTAX_SYMB.AT_KEYWORD_TOKEN
	flag: number
	node: string
	open: '@'
	spot: CSSAtomPosition
}
export interface CSSCDC {
	type: SYNTAX_TYPE.CDC_TOKEN
	symb: SYNTAX_SYMB.CDC_TOKEN
	flag: number
	node: '-->'
	spot: CSSAtomPosition
}
export interface CSSCDO {
	type: SYNTAX_TYPE.CDO_TOKEN
	symb: SYNTAX_SYMB.CDO_TOKEN
	flag: number
	node: '<!--'
	spot: CSSAtomPosition
}
export interface CSSColon {
	type: SYNTAX_TYPE.COLON_TOKEN
	symb: SYNTAX_SYMB.COLON_TOKEN
	flag: number
	node: ':'
	spot: CSSAtomPosition
}
export interface CSSComma {
	type: SYNTAX_TYPE.COMMA_TOKEN
	symb: SYNTAX_SYMB.COMMA_TOKEN
	flag: number
	node: ','
	spot: CSSAtomPosition
}
export interface CSSComment {
	type: SYNTAX_TYPE.COMMENT_TOKEN
	symb: SYNTAX_SYMB.COMMENT_TOKEN
	flag: number
	node: string
	open: '/*'
	shut: '*/' | ''
	spot: CSSAtomPosition
}
export interface CSSDelimiter {
	type: SYNTAX_TYPE.DELIMITER_TOKEN
	symb: SYNTAX_SYMB.DELIMITER_TOKEN
	flag: number
	node: string
	code: number
	spot: CSSAtomPosition
}
export interface CSSDimension {
	type: SYNTAX_TYPE.DIMENSION_TOKEN
	symb: SYNTAX_SYMB.DIMENSION_TOKEN
	flag: number
	node: string
	unit: string
	spot: CSSAtomPosition
}
export interface CSSFunctionToken {
	type: SYNTAX_TYPE.FUNCTION_TOKEN
	symb: SYNTAX_SYMB.FUNCTION_TOKEN
	flag: number
	node: string
	shut: '('
	spot: CSSAtomPosition
}
export interface CSSHash {
	type: SYNTAX_TYPE.HASH_TOKEN
	symb: SYNTAX_SYMB.HASH_TOKEN
	flag: number
	node: string
	open: '#'
	spot: CSSAtomPosition
}
export interface CSSIdentifier {
	type: SYNTAX_TYPE.IDENT_TOKEN
	symb: SYNTAX_SYMB.IDENT_TOKEN
	flag: number
	node: string
	spot: CSSAtomPosition
}
export interface CSSNumber {
	type: SYNTAX_TYPE.NUMBER_TOKEN
	symb: SYNTAX_SYMB.NUMBER_TOKEN
	flag: number
	node: string /** @todo - store node as numeric value (parseFloat?) */
	spot: CSSAtomPosition
}
export interface CSSOpenCurlyBrace {
	type: SYNTAX_TYPE.OPEN_CURLY_BRACE_TOKEN
	symb: SYNTAX_SYMB.OPEN_CURLY_BRACE_TOKEN
	flag: number
	node: '{'
	spot: CSSAtomPosition
}
export interface CSSOpenParenthesis {
	type: SYNTAX_TYPE.OPEN_PARENTHESIS_TOKEN
	symb: SYNTAX_SYMB.OPEN_PARENTHESIS_TOKEN
	flag: number
	node: '('
	spot: CSSAtomPosition
}
export interface CSSOpenSquareBracket {
	type: SYNTAX_TYPE.OPEN_SQUARE_BRACKET_TOKEN
	symb: SYNTAX_SYMB.OPEN_SQUARE_BRACKET_TOKEN
	flag: number
	node: '['
	spot: CSSAtomPosition
}
export interface CSSPercentage {
	type: SYNTAX_TYPE.PERCENTAGE_TOKEN
	symb: SYNTAX_SYMB.PERCENTAGE_TOKEN
	flag: number
	node: string
	unit: '%'
	spot: CSSAtomPosition
}
export interface CSSSemicolon {
	type: SYNTAX_TYPE.SEMICOLON_TOKEN
	symb: SYNTAX_SYMB.SEMICOLON_TOKEN
	flag: number
	node: ';'
	spot: CSSAtomPosition
}
export interface CSSShutCurlyBrace {
	type: SYNTAX_TYPE.SHUT_CURLY_BRACE_TOKEN
	symb: SYNTAX_SYMB.SHUT_CURLY_BRACE_TOKEN
	flag: number
	node: '}'
	spot: CSSAtomPosition
}
export interface CSSShutParenthesis {
	type: SYNTAX_TYPE.SHUT_PARENTHESIS_TOKEN
	symb: SYNTAX_SYMB.SHUT_PARENTHESIS_TOKEN
	flag: number
	node: ')'
	spot: CSSAtomPosition
}
export interface CSSShutSquareBracket {
	type: SYNTAX_TYPE.SHUT_SQUARE_BRACKET_TOKEN
	symb: SYNTAX_SYMB.SHUT_SQUARE_BRACKET_TOKEN
	flag: number
	node: ']'
	spot: CSSAtomPosition
}
export interface CSSString {
	type: SYNTAX_TYPE.STRING_TOKEN
	symb: SYNTAX_SYMB.STRING_TOKEN
	flag: number
	node: string
	open: `"` | `'`
	shut: `"` | `'` | ''
	spot: CSSAtomPosition
}
export interface CSSUrl {
	type: SYNTAX_TYPE.URL_TOKEN
	symb: SYNTAX_SYMB.URL_TOKEN
	flag: number
	node: string
	open: string
	shut: string
	spot: CSSAtomPosition
}
export interface CSSWhitespace {
	type: SYNTAX_TYPE.WHITESPACE_TOKEN
	symb: SYNTAX_SYMB.WHITESPACE_TOKEN
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
