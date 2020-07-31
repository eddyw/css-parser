import { createContext } from '~/shared/context'
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
import type { TokenizerYield } from '~/shared/context'

export function* tokenizer(css: string): Generator<TokenizerYield, void, boolean> {
	const ctx = createContext(css)

	while (ctx.tokenShut <= ctx.sourceSize) {
		ctx.setCodePointAtCurrent()
		ctx.tokenType = TYPE.EOF
		ctx.tokenOpen = ctx.tokenShut
		ctx.tokenLead = 0
		ctx.tokenTail = 0
		ctx.tokenFlag = 0

		switch (true) {
			case ctx.charAt0 === TOKEN.EOF:
				ctx.tokenType = TYPE.EOF
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.FORWARD_SOLIDUS && ctx.charAt1 === TOKEN.ASTERISK:
				ctx.tokenShut += 2 // Consume «FORWARD SOLIDUS (/), followed by ASTERISK (*)»
				consumeComments(ctx)
				break
			case isWhitespace(ctx.charAt0):
				ctx.tokenType = TYPE.WHITESPACE
				ctx.tokenShut += 1 // Consume « <whitespace> »
				consumeWhitespace(ctx)
				break
			case ctx.charAt0 === TOKEN.DOUBLE_QUOTE:
				consumeStringToken(ctx, ctx.charAt0)
				break
			case ctx.charAt0 === TOKEN.HASH:
				if (isIdentifierNameStart(ctx.charAt1) || areValidEscape(ctx.charAt1, ctx.charAt2)) {
					ctx.tokenType = TYPE.HASH
					ctx.tokenLead = 1

					if (areIdentifierNameStart(ctx.charAt1, ctx.charAt2, ctx.charAt3)) {
						ctx.tokenFlag |= FLAGS_HASH.IS_ID
					}
					consumeIdentifier(ctx)
					break
				}
				ctx.tokenShut += 1
				ctx.tokenType = TYPE.DELIMITER
				break
			case ctx.charAt0 === TOKEN.SINGLE_QUOTE:
				consumeStringToken(ctx, ctx.charAt0)
				break
			case ctx.charAt0 === TOKEN.L_PARENTHESIS:
				ctx.tokenShut += 1
				ctx.tokenType = TYPE.L_PARENTHESIS
				break
			case ctx.charAt0 === TOKEN.R_PARENTHESIS:
				ctx.tokenShut += 1
				ctx.tokenType = TYPE.R_PARENTHESIS
				break
			case ctx.charAt0 === TOKEN.PLUS:
				if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
					consumeNumericToken(ctx)
					break
				}
				ctx.tokenShut += 1
				ctx.tokenType = TYPE.DELIMITER
				break
			case ctx.charAt0 === TOKEN.COMMA:
				ctx.tokenShut += 1
				ctx.tokenType = TYPE.COMMA
				break
			case ctx.charAt0 === TOKEN.MINUS:
				if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
					consumeNumericToken(ctx)
					break
				} else {
					if (ctx.charAt1 === TOKEN.MINUS && ctx.charAt2 === TOKEN.GREATER_THAN) {
						ctx.tokenShut += 3 // Consume (-->)
						ctx.tokenType = TYPE.CDC
					} else {
						if (areIdentifierNameStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
							consumeIdentLikeToken(ctx)
						} else {
							ctx.tokenType = TYPE.DELIMITER
							ctx.tokenShut += 1
						}
					}
				}
				break
			case ctx.charAt0 === TOKEN.STOP:
				if (areNumberStart(ctx.charAt0, ctx.charAt1, ctx.charAt2)) {
					consumeNumericToken(ctx)
				} else {
					ctx.tokenShut += 1
					ctx.tokenType = TYPE.DELIMITER
				}
				break
			case ctx.charAt0 === TOKEN.COLON:
				ctx.tokenType = TYPE.COLON
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.SEMI:
				ctx.tokenType = TYPE.SEMI
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.LESS_THAN:
				if (ctx.charAt1 === TOKEN.EXCLAMATION && ctx.charAt2 === TOKEN.MINUS && ctx.charAt3 === TOKEN.MINUS) {
					ctx.tokenType = TYPE.CDO
					ctx.tokenShut += 4 // Consume (<!--)
				} else {
					ctx.tokenType = TYPE.DELIMITER
					ctx.tokenShut += 1
				}
				break
			case ctx.charAt0 === TOKEN.AT:
				if (areIdentifierNameStart(ctx.charAt1, ctx.charAt2, ctx.charAt3)) {
					ctx.tokenType = TYPE.AT_RULE
					consumeIdentifier(ctx)
					break
				} else {
					ctx.tokenType = TYPE.DELIMITER
					ctx.tokenShut += 1
				}
				break
			case ctx.charAt0 === TOKEN.L_SQUARE_BRACKET:
				ctx.tokenType = TYPE.L_SQUARE_BRACKET
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.REVERSE_SOLIDUS:
				if (areValidEscape(ctx.charAt0, ctx.charAt1)) {
					consumeIdentLikeToken(ctx)
				} else {
					ctx.tokenFlag = FLAGS_ALL.IS_PARSE_ERROR
					ctx.tokenType = TYPE.DELIMITER
					ctx.tokenShut += 1
				}
				break
			case ctx.charAt0 === TOKEN.R_SQUARE_BRACKET:
				ctx.tokenType = TYPE.R_SQUARE_BRACKET
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.L_CURLY_BRACKET:
				ctx.tokenType = TYPE.L_CURLY_BRACKET
				ctx.tokenShut += 1
				break
			case ctx.charAt0 === TOKEN.R_CURLY_BRACKET:
				ctx.tokenType = TYPE.R_CURLY_BRACKET
				ctx.tokenShut += 1
				break
			case isDigit(ctx.charAt0):
				consumeNumericToken(ctx)
				break
			case isIdentifierNameStart(ctx.charAt0):
				consumeIdentLikeToken(ctx)
				break
			default:
				ctx.tokenType = TYPE.DELIMITER
				ctx.tokenShut += 1
		}

		if (
			yield {
				tokenType: ctx.tokenType,
				tokenOpen: ctx.tokenOpen,
				tokenShut: ctx.tokenShut,
				tokenTail: ctx.tokenTail,
				tokenLead: ctx.tokenLead,
				tokenFlag: ctx.tokenFlag,
			}
		) {
			return /** Abort | Stop when iter.next(true) */
		}
  }
}
