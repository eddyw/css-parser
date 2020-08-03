import { TokenizerContext } from '~/shared/context'
import { TOKEN, TYPE, FLAGS_ALL, FLAGS_HASH } from '~/constants'
import {
	areIdentifierNameStart,
	areNumberStart,
	areValidEscape,
	isDigit,
	isIdentifierNameStart,
	isWhitespace,
} from './definitions'
import {
	consumeComments,
	consumeIdentLikeToken,
	consumeIdentifier,
	consumeNumericToken,
	consumeStringToken,
	consumeWhitespace,
} from './algorithms'

export interface TokenizerReturnToken {
	tokenType: TYPE
	tokenOpen: number
	tokenShut: number
	tokenTail: number
	tokenLead: number
	tokenFlag: number
	tokenLineOpen: number
	tokenLineShut: number
	tokenColumnOpen: number
	tokenColumnShut: number
}

export function tokenizer(ctx: TokenizerContext) {
	function consumeToken(): TokenizerReturnToken {
		if (ctx.tokenShut > ctx.sourceSize) throw Error('Out of bounds')
		ctx.setCodePointAtCurrent()
		ctx.tokenType = TYPE.EOF
		ctx.tokenOpen = ctx.tokenShut
		ctx.tokenLead = 0
		ctx.tokenTail = 0
		ctx.tokenFlag = 0
		ctx.tokenLineOpen = ctx.tokenLineShut
		ctx.tokenColumnOpen = ctx.tokenColumnShut

		if (ctx.tokenShut === ctx.sourceSize) {
			ctx.tokenType = TYPE.EOF
			ctx.tokenShut += 1
		} else if (ctx.charAt0 === TOKEN.FORWARD_SOLIDUS && ctx.charAt1 === TOKEN.ASTERISK) {
			consumeComments(ctx)
		} else if (isWhitespace(ctx.charAt0)) {
			ctx.tokenType = TYPE.WHITESPACE
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
			consumeWhitespace(ctx)
		} else if (ctx.charAt0 === TOKEN.DOUBLE_QUOTE) {
			consumeStringToken(ctx, ctx.charAt0)
		} else if (ctx.charAt0 === TOKEN.HASH) {
			if (isIdentifierNameStart(ctx.charAt1) || areValidEscape(ctx.charAt1, ctx.charAt2)) {
				ctx.tokenType = TYPE.HASH
				ctx.tokenLead = 1

				if (areIdentifierNameStart(ctx.charAt1, ctx.charAt2, ctx.charAt3)) {
					ctx.tokenFlag |= FLAGS_HASH.IS_ID
				}
				consumeIdentifier(ctx)
			} else {
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
				ctx.tokenType = TYPE.DELIMITER
			}
		} else if (ctx.charAt0 === TOKEN.SINGLE_QUOTE) {
			consumeStringToken(ctx, ctx.charAt0)
		} else if (ctx.charAt0 === TOKEN.L_PARENTHESIS) {
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
			ctx.tokenType = TYPE.L_PARENTHESIS
		} else if (ctx.charAt0 === TOKEN.R_PARENTHESIS) {
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
			ctx.tokenType = TYPE.R_PARENTHESIS
		} else if (ctx.charAt0 === TOKEN.PLUS) {
			if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
				consumeNumericToken(ctx)
			} else {
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
				ctx.tokenType = TYPE.DELIMITER
			}
		} else if (ctx.charAt0 === TOKEN.COMMA) {
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
			ctx.tokenType = TYPE.COMMA
		} else if (ctx.charAt0 === TOKEN.MINUS) {
			if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
				consumeNumericToken(ctx)
			} else {
				if (ctx.charAt1 === TOKEN.MINUS && ctx.charAt2 === TOKEN.GREATER_THAN) {
					ctx.tokenShut += 3 // Consume (-->)
					ctx.tokenColumnShut += 3
					ctx.tokenType = TYPE.CDC
				} else {
					if (areIdentifierNameStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
						consumeIdentLikeToken(ctx)
					} else {
						ctx.tokenType = TYPE.DELIMITER
						ctx.tokenShut += 1
						ctx.tokenColumnShut += 1
					}
				}
			}
		} else if (ctx.charAt0 === TOKEN.STOP) {
			if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
				consumeNumericToken(ctx)
			} else {
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
				ctx.tokenType = TYPE.DELIMITER
			}
		} else if (ctx.charAt0 === TOKEN.COLON) {
			ctx.tokenType = TYPE.COLON
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (ctx.charAt0 === TOKEN.SEMI) {
			ctx.tokenType = TYPE.SEMI
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (ctx.charAt0 === TOKEN.LESS_THAN) {
			if (ctx.charAt1 === TOKEN.EXCLAMATION && ctx.charAt2 === TOKEN.MINUS && ctx.charAt3 === TOKEN.MINUS) {
				ctx.tokenType = TYPE.CDO
				ctx.tokenShut += 4 // Consume (<!--)
				ctx.tokenColumnShut += 4
			} else {
				ctx.tokenType = TYPE.DELIMITER
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
			}
		} else if (ctx.charAt0 === TOKEN.AT) {
			if (areIdentifierNameStart(ctx.charAt1, ctx.charAt2, ctx.charAt3)) {
				ctx.tokenType = TYPE.AT_RULE
				consumeIdentifier(ctx)
			} else {
				ctx.tokenType = TYPE.DELIMITER
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
			}
		} else if (ctx.charAt0 === TOKEN.L_SQUARE_BRACKET) {
			ctx.tokenType = TYPE.L_SQUARE_BRACKET
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (ctx.charAt0 === TOKEN.REVERSE_SOLIDUS) {
			if (areValidEscape(ctx.charAt0, ctx.charAt1)) {
				consumeIdentLikeToken(ctx)
			} else {
				ctx.tokenFlag = FLAGS_ALL.IS_PARSE_ERROR
				ctx.tokenType = TYPE.DELIMITER
				ctx.tokenShut += 1
				ctx.tokenColumnShut += 1
			}
		} else if (ctx.charAt0 === TOKEN.R_SQUARE_BRACKET) {
			ctx.tokenType = TYPE.R_SQUARE_BRACKET
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (ctx.charAt0 === TOKEN.L_CURLY_BRACKET) {
			ctx.tokenType = TYPE.L_CURLY_BRACKET
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (ctx.charAt0 === TOKEN.R_CURLY_BRACKET) {
			ctx.tokenType = TYPE.R_CURLY_BRACKET
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		} else if (isDigit(ctx.charAt0)) {
			consumeNumericToken(ctx)
		} else if (isIdentifierNameStart(ctx.charAt0)) {
			consumeIdentLikeToken(ctx)
		} else {
			ctx.tokenType = TYPE.DELIMITER
			ctx.tokenShut += 1
			ctx.tokenColumnShut += 1
		}

		return {
			tokenType: ctx.tokenType,
			tokenOpen: ctx.tokenOpen,
			tokenShut: ctx.tokenShut,
			tokenTail: ctx.tokenTail,
			tokenLead: ctx.tokenLead,
			tokenFlag: ctx.tokenFlag,
			tokenLineOpen: ctx.tokenLineOpen,
			tokenLineShut: ctx.tokenLineShut,
			tokenColumnOpen: ctx.tokenColumnOpen,
			tokenColumnShut: ctx.tokenColumnShut,
		}
	}

	return {
		isDone() {
			return ctx.tokenShut > ctx.sourceSize
		},
		consumeToken,
	}
}
