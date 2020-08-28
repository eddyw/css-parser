import { TOKEN, NODE_SYMB, FLAG_ANY } from '~/constants'
import {
	areIdentifierNameStart,
	areNumberStart,
	areValidEscape,
	isDigit,
	isIdentifierStartCodePoint,
	isWhitespace,
} from './definitions'
import {
	consumeComments,
	consumeIdentLikeToken,
	consumeNumericToken,
	consumeStringToken,
	consumeWhitespace,
	consumeHash,
	consumeOpenParenthesis,
	consumeShutParenthesis,
	consumeDelimToken,
	consumeCommaToken,
	consumeCDCToken,
	consumeCDOToken,
	consumeEndOfFile,
	consumeColonToken,
	consumeSemiToken,
	consumeOpenSquareBracket,
	consumeShutSquareBracket,
	consumeOpenCurlyBrace,
	consumeShutCurlyBrace,
	consumeAtKeywordToken,
} from './algorithms'
import type { TokenizerContext, Tokenizer, CSSToken } from '~/shared/types'

const up = Error('Out of bounds')

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-token
 * @description § 4.3.1. Consume a token
 */
export function tokenizer(x: TokenizerContext): Tokenizer {
	function consumeToken(): CSSToken {
		if (x.shut > x.size) throw up

		x.setCodeAtCurrent()
		x.type = NODE_SYMB.END_OF_FILE as NODE_SYMB
		x.open = x.shut
		x.lead = 0
		x.tail = 0
		x.flag = 0

		if (x.codeAt0 === TOKEN.FORWARD_SOLIDUS && x.codeAt1 === TOKEN.ASTERISK) {
			return consumeComments(x)
		}

		if (isWhitespace(x.codeAt0)) {
			return consumeWhitespace(x)
		}

		if (x.codeAt0 === TOKEN.DOUBLE_QUOTE || x.codeAt0 === TOKEN.SINGLE_QUOTE) {
			return consumeStringToken(x, x.codeAt0)
		}

		if (x.codeAt0 === TOKEN.HASH) {
			return consumeHash(x)
		}

		if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
			return consumeOpenParenthesis(x)
		}

		if (x.codeAt0 === TOKEN.R_PARENTHESIS) {
			return consumeShutParenthesis(x)
		}

		if (x.codeAt0 === TOKEN.PLUS) {
			if (areNumberStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
				return consumeNumericToken(x)
			}
			return consumeDelimToken(x, TOKEN.PLUS, '+')
		}

		if (x.codeAt0 === TOKEN.COMMA) {
			return consumeCommaToken(x)
		}

		if (x.codeAt0 === TOKEN.MINUS) {
			if (areNumberStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
				return consumeNumericToken(x)
			}

			if (x.codeAt1 === TOKEN.MINUS && x.codeAt2 === TOKEN.GREATER_THAN) {
				return consumeCDCToken(x)
			} else if (areIdentifierNameStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
				return consumeIdentLikeToken(x)
			} else {
				return consumeDelimToken(x, TOKEN.MINUS, '-')
			}
		}

		if (x.codeAt0 === TOKEN.STOP) {
			if (areNumberStart(x.codeAt0, x.codeAt1, x.codeAt2)) {
				return consumeNumericToken(x)
			}
			return consumeDelimToken(x, TOKEN.STOP, '.')
		}

		if (x.codeAt0 === TOKEN.COLON) {
			return consumeColonToken(x)
		}

		if (x.codeAt0 === TOKEN.SEMI) {
			return consumeSemiToken(x)
		}

		if (x.codeAt0 === TOKEN.LESS_THAN) {
			if (x.codeAt1 === TOKEN.EXCLAMATION && x.codeAt2 === TOKEN.MINUS && x.codeAt3 === TOKEN.MINUS) {
				return consumeCDOToken(x)
			}
			return consumeDelimToken(x, TOKEN.LESS_THAN, '<')
		}

		if (x.codeAt0 === TOKEN.AT) {
			if (areIdentifierNameStart(x.codeAt1, x.codeAt2, x.codeAt3)) {
				return consumeAtKeywordToken(x)
			}
			return consumeDelimToken(x, TOKEN.AT, '@')
		}

		if (x.codeAt0 === TOKEN.L_SQUARE_BRACKET) {
			return consumeOpenSquareBracket(x)
		}

		if (x.codeAt0 === TOKEN.REVERSE_SOLIDUS) {
			if (areValidEscape(x.codeAt0, x.codeAt1) && x.codeAt1 !== TOKEN.EOF) {
				return consumeIdentLikeToken(x)
			}
			x.flag |= FLAG_ANY.PARSE_ERROR
			return consumeDelimToken(x, TOKEN.REVERSE_SOLIDUS, '\\')
		}

		if (x.codeAt0 === TOKEN.R_SQUARE_BRACKET) {
			return consumeShutSquareBracket(x)
		}

		if (x.codeAt0 === TOKEN.L_CURLY_BRACKET) {
			return consumeOpenCurlyBrace(x)
		}

		if (x.codeAt0 === TOKEN.R_CURLY_BRACKET) {
			return consumeShutCurlyBrace(x)
		}

		if (isDigit(x.codeAt0)) {
			return consumeNumericToken(x)
		}

		if (isIdentifierStartCodePoint(x.codeAt0)) {
			return consumeIdentLikeToken(x)
		}

		if (x.shut === x.size) {
			return consumeEndOfFile(x)
		}

		return consumeDelimToken(x, x.codeAt0, String.fromCodePoint(x.codeAt0))
	}

	return {
		context: x,
		isDone() {
			return x.shut > x.size
		},
		consumeToken,
	}
}
