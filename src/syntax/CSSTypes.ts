import { Code } from '~/core'

export const enum Kind {
	Eof = -1,
	Comment = 0,
	Whitespace,
	Ident,
	Function,
	AtKeyword,
	Hash,
	String,
	BadString,
	Url,
	BadUrl,
	Number,
	Dimension,
	Percentage,
	Cdo,
	Cdc,
	Colon,
	SemiColon,
	Comma,
	LeftSquareBracket,
	RightSquareBracket,
	LeftParenthesis,
	RightParenthesis,
	LeftCurlyBracket,
	RightCurlyBracket,
	Delim,
}
export const KindText = Object.freeze({
	[Kind.Eof]: '<eof>',
	[Kind.Comment]: '<comment>',
	[Kind.Whitespace]: '<whitespace-token>',
	[Kind.Ident]: '<ident-token>',
	[Kind.Function]: '<function-token>',
	[Kind.AtKeyword]: '<at-keyword>',
	[Kind.Hash]: '<hash-token>',
	[Kind.String]: '<string-token>',
	[Kind.BadString]: '<bad-string-token>',
	[Kind.Url]: '<url-token>',
	[Kind.BadUrl]: '<bad-url-token>',
	[Kind.Number]: '<number-token>',
	[Kind.Dimension]: '<dimension-token>',
	[Kind.Percentage]: '<percentage-token>',
	[Kind.Cdo]: '<CDO-token>',
	[Kind.Cdc]: '<CDC-token>',
	[Kind.Colon]: '<colon-token>',
	[Kind.SemiColon]: '<semicolon-token>',
	[Kind.Comma]: '<comma-token>',
	[Kind.LeftSquareBracket]: '<[-token>',
	[Kind.RightSquareBracket]: '<]-token>',
	[Kind.LeftParenthesis]: '<(-token>',
	[Kind.RightParenthesis]: '<)-token>',
	[Kind.LeftCurlyBracket]: '<{-token>',
	[Kind.RightCurlyBracket]: '<}-token>',
	[Kind.Delim]: '<delim-token>',
})

export const enum HashTokenType {
	HashTokenId = 1,
	HashTokenUnknown,
}
export const enum NumberTokenType {
	Integer = 1,
	Number,
}

export interface Position {
	lne: number
	col: number
}

export namespace Token {
	export interface PartialNumber {
		type: NumberTokenType
		repl: string
		calc: number
	}

	export interface WhitespaceToken {
		kind: Kind.Whitespace
		// text: string
	}
	export function WhitespaceToken(_text: string): WhitespaceToken {
		return {
			kind: Kind.Whitespace,
			// text,
		}
	}

	export interface StringToken {
		kind: Kind.String
		type: Code.Apostrophe | Code.QuotationMark
		text: string
	}
	export function StringToken(type: Code.Apostrophe | Code.QuotationMark, text: string): StringToken {
		return {
			kind: Kind.String,
			type,
			text,
		}
	}

	export interface BadStringToken {
		kind: Kind.BadString
		type: Code.Apostrophe | Code.QuotationMark
		text: string
	}
	export function BadStringToken(type: Code.Apostrophe | Code.QuotationMark, text: string): BadStringToken {
		return {
			kind: Kind.BadString,
			type,
			text,
		}
	}

	export interface HashToken {
		kind: Kind.Hash
		type: HashTokenType
		text: string
	}
	export function HashToken(type: HashTokenType, text: string): HashToken {
		return {
			kind: Kind.Hash,
			type,
			text,
		}
	}

	export interface DelimToken {
		kind: Kind.Delim
		type: number
		text: string
	}
	export function DelimToken(type: number): DelimToken {
		return {
			kind: Kind.Delim,
			type,
			text: String.fromCharCode(type),
		}
	}

	export interface LeftParenthesisToken {
		kind: Kind.LeftParenthesis
	}
	export function LeftParenthesisToken(): LeftParenthesisToken {
		return {
			kind: Kind.LeftParenthesis,
		}
	}

	export interface RightParenthesis {
		kind: Kind.RightParenthesis
	}
	export function RightParenthesis(): RightParenthesis {
		return {
			kind: Kind.RightParenthesis,
		}
	}

	type OfKindGeneric =
		| Kind.LeftCurlyBracket
		| Kind.LeftParenthesis
		| Kind.LeftSquareBracket
		| Kind.RightCurlyBracket
		| Kind.RightParenthesis
		| Kind.RightSquareBracket
		| Kind.Comma
		| Kind.SemiColon
		| Kind.Colon
		| Kind.Cdc
		| Kind.Cdo
		| Kind.Eof
		| Kind.Comment // @todo - Move to its own
	export interface OfKind {
		kind: OfKindGeneric
	}
	export function OfKind(kind: OfKindGeneric): OfKind {
		return { kind }
	}

	export interface NumberToken extends PartialNumber {
		kind: Kind.Number
	}
	export function NumberToken(number: NumberToken): NumberToken {
		return {
			kind: Kind.Number,
			type: number.type,
			repl: number.repl,
			calc: number.calc,
		}
	}

	export interface PercentageToken extends PartialNumber {
		kind: Kind.Percentage
		type: NumberTokenType.Number
	}
	export function PercentageToken(number: NumberToken): PercentageToken {
		return {
			kind: Kind.Percentage,
			type: NumberTokenType.Number,
			repl: number.repl,
			calc: number.calc,
		}
	}

	export interface DimensionToken extends PartialNumber {
		kind: Kind.Dimension
		unit: string
	}
	export function DimensionToken(number: NumberToken, unit: string): DimensionToken {
		return {
			kind: Kind.Dimension,
			type: number.type,
			repl: number.repl,
			calc: number.calc,
			unit,
		}
	}

	export interface FunctionToken {
		kind: Kind.Function
		text: string
	}
	export function FunctionToken(text: string): FunctionToken {
		return {
			kind: Kind.Function,
			text,
		}
	}

	export interface AtKeywordToken {
		kind: Kind.AtKeyword
		text: string
	}
	export function AtKeywordToken(text: string): AtKeywordToken {
		return {
			kind: Kind.AtKeyword,
			text,
		}
	}

	export interface IdentToken {
		kind: Kind.Ident
		text: string
	}
	export function IdentToken(text: string): IdentToken {
		return {
			kind: Kind.Ident,
			text,
		}
	}

	export interface UrlToken {
		kind: Kind.Url
		text: string
	}
	export function UrlToken(text: string): UrlToken {
		return {
			kind: Kind.Url,
			text,
		}
	}

	export interface BadUrlToken {
		kind: Kind.BadUrl
		text: string
	}
	export function BadUrlToken(text: string): BadUrlToken {
		return {
			kind: Kind.BadUrl,
			text,
		}
	}
}
