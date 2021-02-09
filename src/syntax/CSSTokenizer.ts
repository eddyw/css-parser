import { Code, is } from '~/core'
import { HashTokenType, Kind, NumberTokenType, Token, Position } from './CSSTypes'

export interface CSSTokenizerOptions {
	css: string
	comments?: boolean
}
export interface CSSTokenizer {
	text: string
	size: number
	tick: number
	at0: number
	currentLne: number
	currentCol: number
	lastLneLen: number
	locPosInfo: Position
	shouldConsumeComments: boolean
}
export class CSSTokenizer {
	constructor(options: CSSTokenizerOptions) {
		this.text = options.css
		this.size = this.text.length
		this.tick = -1
		this.at0 = this.at(1)

		this.currentLne = 0
		this.currentCol = 0
		this.lastLneLen = 0
		this.locPosInfo = { lne: 0, col: 0 }

		this.shouldConsumeComments = !!options.comments
	}
	incrementLne() {
		this.currentLne += 1
		this.lastLneLen = this.currentCol
		this.currentCol = 0
	}
	getTokens() {
		const tokens: any[] = []
		while (this.at0 !== Code.EndOfFileMarker) {
			// const posIni = {
			// 	lne: this.currentLne,
			// 	col: this.currentCol,
			// }
			const token = this.consumeOneToken()
			// @ts-expect-err
			// token.pos = {
			// 	ini: posIni,
			// 	end: {
			// 		lne: this.currentLne,
			// 		col: this.currentCol,
			// 	},
			// }
			tokens.push(token)
		}
		return tokens
	}
	at(n: number): number {
		if (this.tick + n >= this.text.length) return -1
		return this.text.charCodeAt(this.tick + n)
	}
	consume(n: number = 1) {
		this.tick += n
		this.at0 = this.at(0)

		switch (this.at0) {
			case Code.CarriageReturn:
			case Code.LineFeed:
			case Code.FormFeed:
				this.incrementLne()
				break
			default:
				this.currentCol += n
		}
	}
	reconsume() {
		switch (this.at0) {
			case Code.CarriageReturn:
			case Code.LineFeed:
			case Code.FormFeed:
				this.currentLne -= 1
				this.currentCol = this.lastLneLen
				break
			default:
				this.currentCol -= 1
		}

		this.tick -= 1
		this.at0 = this.at(0)
	}
	consumeOneToken() {
		this.consume()

		if (is.ASCII(this.at0)) {
			return this.consumeAsciiToken()
		}

		this.reconsume()
		return this.consumeIdentLike()
	}
	consumeAsciiToken() {
		switch (this.at0) {
			case Code.LineFeed:
			case Code.CarriageReturn:
			case Code.FormFeed:
			case Code.CharacterTabulation:
			case Code.Space:
				return this.consumeWhitespace()
			case Code.QuotationMark:
				return this.consumeString(Code.QuotationMark)
			case Code.NumberSign:
				return this.consumeNumberSign()
			case Code.Apostrophe:
				return this.consumeString(Code.Apostrophe)
			case Code.LeftParenthesis:
				return Token.OfKind(Kind.LeftParenthesis)
			case Code.RightParenthesis:
				return Token.OfKind(Kind.RightParenthesis)
			case Code.PlusSign:
				return this.consumePlusOrFullStop()
			case Code.Comma:
				return Token.OfKind(Kind.Comma)
			case Code.HyphenMinus:
				return this.consumeHyphenMinus()
			case Code.FullStop:
				return this.consumePlusOrFullStop()
			case Code.Solidus:
				return this.consumeSolidus()
			case Code.Colon:
				return Token.OfKind(Kind.Colon)
			case Code.SemiColon:
				return Token.OfKind(Kind.SemiColon)
			case Code.LessThanSign:
				return this.consumeLessThan()
			case Code.CommercialAt:
				return this.consumeCommercialAt()
			case Code.LeftSquareBracket:
				return Token.OfKind(Kind.LeftSquareBracket)
			case Code.ReverseSolidus:
				return this.consumeReverseSolidus()
			case Code.RightSquareBracket:
				return Token.OfKind(Kind.RightSquareBracket)
			case Code.LeftCurlyBracket:
				return Token.OfKind(Kind.LeftCurlyBracket)
			case Code.RightCurlyBracket:
				return Token.OfKind(Kind.RightCurlyBracket)
			case Code.DigitZero:
			case Code.DigitOne:
			case Code.DigitTwo:
			case Code.DigitThree:
			case Code.DigitFour:
			case Code.DigitFive:
			case Code.DigitSix:
			case Code.DigitSeven:
			case Code.DigitEight:
			case Code.DigitNine:
				this.reconsume()
				return this.consumeNumericToken()
			case Code.LatinCapitalLetterB:
			case Code.LatinCapitalLetterA:
			case Code.LatinCapitalLetterC:
			case Code.LatinCapitalLetterD:
			case Code.LatinCapitalLetterE:
			case Code.LatinCapitalLetterF:
			case Code.LatinCapitalLetterG:
			case Code.LatinCapitalLetterH:
			case Code.LatinCapitalLetterI:
			case Code.LatinCapitalLetterJ:
			case Code.LatinCapitalLetterK:
			case Code.LatinCapitalLetterL:
			case Code.LatinCapitalLetterM:
			case Code.LatinCapitalLetterN:
			case Code.LatinCapitalLetterO:
			case Code.LatinCapitalLetterP:
			case Code.LatinCapitalLetterQ:
			case Code.LatinCapitalLetterR:
			case Code.LatinCapitalLetterS:
			case Code.LatinCapitalLetterT:
			case Code.LatinCapitalLetterU:
			case Code.LatinCapitalLetterV:
			case Code.LatinCapitalLetterW:
			case Code.LatinCapitalLetterX:
			case Code.LatinCapitalLetterY:
			case Code.LatinCapitalLetterZ:
			case Code.LatinSmallLetterB:
			case Code.LatinSmallLetterA:
			case Code.LatinSmallLetterC:
			case Code.LatinSmallLetterD:
			case Code.LatinSmallLetterE:
			case Code.LatinSmallLetterF:
			case Code.LatinSmallLetterG:
			case Code.LatinSmallLetterH:
			case Code.LatinSmallLetterI:
			case Code.LatinSmallLetterJ:
			case Code.LatinSmallLetterK:
			case Code.LatinSmallLetterL:
			case Code.LatinSmallLetterM:
			case Code.LatinSmallLetterN:
			case Code.LatinSmallLetterO:
			case Code.LatinSmallLetterP:
			case Code.LatinSmallLetterQ:
			case Code.LatinSmallLetterR:
			case Code.LatinSmallLetterS:
			case Code.LatinSmallLetterT:
			case Code.LatinSmallLetterU:
			case Code.LatinSmallLetterV:
			case Code.LatinSmallLetterW:
			case Code.LatinSmallLetterX:
			case Code.LatinSmallLetterY:
			case Code.LatinSmallLetterZ:
			case Code.LowLine:
				this.reconsume()
				return this.consumeIdentLike()
			case Code.EndOfFileMarker:
				return Token.OfKind(Kind.Eof)
			default:
				return Token.DelimToken(this.at0)
		}
	}
	consumeWhitespace() {
		while (is.whitespace(this.at(1))) this.consume()
		return Token.WhitespaceToken('')
	}
	consumeString(endingCodePoint: Code.QuotationMark | Code.Apostrophe): Token.StringToken | Token.BadStringToken {
		let output = ''

		while (true) {
			this.consume()
			fromSwitch: switch (this.at0) {
				case endingCodePoint:
				case Code.EndOfFileMarker:
					return Token.StringToken(endingCodePoint, output)
				case Code.LineFeed:
				case Code.CarriageReturn:
				case Code.FormFeed:
					this.parseError()
					this.reconsume()
					return Token.BadStringToken(endingCodePoint, output)
				case Code.ReverseSolidus:
					if (this.at(1) === Code.EndOfFileMarker) break fromSwitch /* do nothing */
					if (is.newline(this.at(1))) {
						this.consumeSingleNewline()
						break fromSwitch
					}
					output += String.fromCharCode(this.consumeEscape()) // @todo - This will probably bite me later (fromCodePoint instead ??? or encode as surrogate pair ???)
					break fromSwitch
				default:
					output += String.fromCharCode(this.at0)
			}
		}
	}
	parseError() {
		console.warn('@todo - ParseError: Do something with it')
	}
	consumeSingleNewline() {
		if (this.at0 === Code.CarriageReturn && this.at(1) === Code.LineFeed) {
			this.consume(2)
		} else if (this.at0 === Code.LineFeed || this.at0 === Code.FormFeed) {
			this.consume()
		}
		throw Error('consumeSingleNewline cannot be called to consume non-newline codepoints.')
	}
	consumeNumberSign() {
		if (is.identifier(this.at(1)) || is.twoCharsValidEscape(this.at(1), this.at(2))) {
			return Token.HashToken(
				is.threeCharsIdentifierStart(this.at(1), this.at(2), this.at(3))
					? HashTokenType.HashTokenId
					: HashTokenType.HashTokenUnknown,
				this.consumeIdentifier(),
			)
		}
		return Token.DelimToken(this.at0)
	}
	consumePlusOrFullStop() {
		if (is.numberStart(this.at0, this.at(1), this.at(2))) {
			this.reconsume()
			return this.consumeNumericToken()
		}
		return Token.DelimToken(this.at0)
	}
	consumeLessThan() {
		if (this.at(1) === Code.ExclamationMark && this.at(2) === Code.HyphenMinus && this.at(3) === Code.HyphenMinus) {
			this.consume(3)
			return Token.OfKind(Kind.Cdo)
		}
		return Token.DelimToken(this.at0)
	}
	consumeHyphenMinus() {
		if (is.numberStart(this.at0, this.at(1), this.at(2))) {
			this.reconsume()
			return this.consumeNumericToken()
		}
		if (this.at(1) === Code.HyphenMinus && this.at(2) === Code.GreaterThanSign) {
			return Token.OfKind(Kind.Cdc)
		}
		if (is.threeCharsIdentifierStart(this.at0, this.at(1), this.at(2))) {
			this.reconsume()
			return this.consumeIdentLike()
		}
		return Token.DelimToken(this.at0)
	}
	consumeCommercialAt() {
		if (is.threeCharsIdentifierStart(this.at(1), this.at(2), this.at(3))) {
			return Token.AtKeywordToken(this.consumeIdentifier())
		}
		return Token.DelimToken(this.at0)
	}
	consumeReverseSolidus() {
		if (is.twoCharsValidEscape(this.at0, this.at(1))) {
			this.reconsume()
			return this.consumeIdentLike()
		}
		this.parseError()
		return Token.DelimToken(this.at0)
	}
	consumeIdentLike() {
		const identifier = this.consumeIdentifier()

		if (identifier.toLocaleLowerCase() === 'url' && this.at(1) === Code.LeftParenthesis) {
			this.consume()

			while (is.whitespace(this.at(1)) && is.whitespace(this.at(2))) this.consume()

			if (
				this.at(1) === Code.QuotationMark ||
				this.at(1) === Code.Apostrophe ||
				(is.whitespace(this.at(1)) && (this.at(2) === Code.QuotationMark || this.at(3) === Code.Apostrophe))
			) {
				return Token.FunctionToken(identifier)
			}

			return this.consumeUrlToken()
		} else if (this.at(1) === Code.LeftParenthesis) {
			this.consume()
			return Token.FunctionToken(identifier)
		}

		return Token.IdentToken(identifier)
	}
	consumeBadUrlRemnants() {
		while (true) {
			this.consume()
			if (this.at0 === Code.RightParenthesis || this.at0 === Code.EndOfFileMarker) return
			if (is.twoCharsValidEscape(this.at0, this.at(1))) this.consumeEscape()
		}
	}
	/** @see https://drafts.csswg.org/css-syntax/#consume-url-token */
	consumeUrlToken() {
		const token = Token.UrlToken('')

		while (is.whitespace(this.at(1))) this.consume()

		loop: while (true) {
			this.consume()

			if (this.at0 === Code.RightParenthesis) return token

			if (this.at0 === Code.EndOfFileMarker) {
				this.parseError()
				return token
			}

			if (is.whitespace(this.at0)) {
				while (is.whitespace(this.at(1))) this.consume()

				switch (this.at(1)) {
					// /** @ts-expect-error: Fallthrough case in switch. */
					case Code.EndOfFileMarker:
						this.parseError()
					case Code.RightParenthesis:
						this.consume()
						return token
					default:
						this.consumeBadUrlRemnants()
						return Token.BadUrlToken('') // @todo - return something
				}
			}

			if (
				this.at0 === Code.QuotationMark ||
				this.at0 === Code.Apostrophe ||
				this.at0 === Code.LeftParenthesis ||
				is.nonPrintable(this.at0)
			) {
				this.parseError()
				this.consumeBadUrlRemnants()
				return Token.BadUrlToken('') // @todo - return something
			}

			if (this.at0 === Code.ReverseSolidus) {
				if (is.twoCharsValidEscape(this.at0, this.at(1))) {
					token.text += String.fromCharCode(this.consumeEscape())
					continue loop
				}
				this.parseError()
				this.consumeBadUrlRemnants()
				return Token.BadUrlToken('') // @todo - return something
			}

			token.text += String.fromCharCode(this.at0)
		}
	}
	consumeSolidus() {
		if (this.at(1) === Code.Asterisk) {
			this.consume(2)
			loop: while (true) {
				this.consume()
				if (this.at0 === Code.Asterisk && this.at(1) === Code.Solidus) break loop
				else if (is.eof(this.at0)) {
					this.parseError()
					break loop
				}
			}
			return Token.OfKind(Kind.Comment) // @todo - Move me out of here
		}
		return Token.DelimToken(Code.Solidus)
	}

	consumeNumber(): Token.NumberToken {
		let type = NumberTokenType.Integer
		let repl = ''

		if (this.at(1) === Code.PlusSign || this.at(1) === Code.HyphenMinus) {
			this.consume()
			repl += String.fromCharCode(this.at0)
		}

		while (is.digit(this.at(1))) {
			this.consume()
			repl += String.fromCharCode(this.at0)
		}

		if (this.at(1) === Code.FullStop && is.digit(this.at(2))) {
			type = NumberTokenType.Number
			repl += String.fromCharCode(this.at(1))
			repl += String.fromCharCode(this.at(2))
			this.consume(2)

			while (is.digit(this.at(1))) {
				this.consume()
				repl += String.fromCharCode(this.at0)
			}
		}

		if (this.at(1) === Code.LatinSmallLetterE || this.at(1) === Code.LatinCapitalLetterE) {
			if (is.digit(this.at(2))) {
				type = NumberTokenType.Number
				repl += String.fromCharCode(this.at(1))
				repl += String.fromCharCode(this.at(2))
				this.consume(2)

				while (is.digit(this.at(1))) {
					this.consume()
					repl += String.fromCharCode(this.at0)
				}
			} else if ((this.at(2) === Code.PlusSign || this.at(2) === Code.HyphenMinus) && is.digit(this.at(3))) {
				type = NumberTokenType.Number
				repl += String.fromCharCode(this.at(1))
				repl += String.fromCharCode(this.at(2))
				repl += String.fromCharCode(this.at(3))
				this.consume(3)

				while (is.digit(this.at(1))) {
					this.consume()
					repl += String.fromCharCode(this.at0)
				}
			}
		}

		return {
			kind: Kind.Number,
			repl,
			type,
			calc: Number(repl),
		}
	}

	/** @see https://drafts.csswg.org/css-syntax/#consume-a-numeric-token */
	consumeNumericToken() {
		const number = this.consumeNumber()

		if (is.threeCharsIdentifierStart(this.at(1), this.at(2), this.at(3))) {
			return Token.DimensionToken(number, this.consumeIdentifier())
		} else if (this.at(1) === Code.PercentageSign) {
			this.consume()
			return Token.PercentageToken(number)
		}

		return number
	}

	/** @see https://drafts.csswg.org/css-syntax/#consume-escaped-code-point */
	consumeEscape(): number {
		this.consume()

		if (is.hexDigit(this.at0)) {
			const hexDigits: number[] = [this.at0]

			for (let consumedHexDigits = 1; consumedHexDigits < 6 && is.hexDigit(this.at(1)); consumedHexDigits += 1) {
				this.consume()
				hexDigits.push(this.at0)
			}

			if (is.newline(this.at(1))) this.consumeSingleNewline()

			const hexValue = parseInt(String.fromCharCode.apply(null, hexDigits), 16)

			if (hexValue === 0 || hexValue > Code.MAXIMUM_ALLOWED_CODE_POINT) return Code.ReplacementCharacter
			return hexValue
		}

		if (is.eof(this.at0)) {
			this.parseError()
			return Code.ReplacementCharacter
		}

		return this.at0
	}

	/** @see https://drafts.csswg.org/css-syntax/#consume-an-identifier */
	consumeIdentifier(): string {
		let result = ''

		loop: while (true) {
			this.consume()

			if (is.identifier(this.at0)) {
				result += String.fromCharCode(this.at0)
				continue loop
			}

			if (is.twoCharsValidEscape(this.at0, this.at(1))) {
				result += String.fromCharCode(this.consumeEscape())
				continue loop
			}

			this.reconsume()
			return result
		}
	}
}
