import { TOKEN, NODE_SYMB, NODE_TYPE, LOWERCASE, UPPERCASE } from '~/constants'
import { consumeIdentifier, consumeUrlToken } from '.'
import { isWhitespace } from '~/tokenizer/definitions'
import type { TokenizerContext, CSSIdentifier, CSSFunctionToken, CSSUrl } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-ident-like-token
 * @description § 4.3.4. Consume an ident-like token
 * This section describes how to consume an ident-like token from a stream of code points.
 * It returns an <ident-token>, <function-token>, <url-token>, or <bad-url-token>.
 *
 * Consume an identifier, and let string be the result.
 *
 * If string’s value is an ASCII case-insensitive match for "url",
 * and the next input code point is U+0028 LEFT PARENTHESIS ((),
 * consume it.
 *
 * While the next two input code points are whitespace, consume the next input code point.
 *
 * If the next one or two input code points are
 * 		U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
 * 		or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
 * then create a <function-token> with its value set to string and return it.
 * Otherwise, consume a url token, and return it.
 *
 * Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
 * Create a <function-token> with its value set to string and return it.
 *
 * Otherwise, create an <ident-token> with its value set to string and return it.
 */
export function consumeIdentLikeToken(
	x: TokenizerContext,
): Readonly<CSSIdentifier> | Readonly<CSSFunctionToken> | Readonly<CSSUrl> {
	if (
		(x.codeAt0 === (LOWERCASE.U as number) || x.codeAt0 === (UPPERCASE.U as number)) &&
		(x.codeAt1 === (LOWERCASE.R as number) || x.codeAt1 === (UPPERCASE.R as number)) &&
		(x.codeAt2 === (LOWERCASE.L as number) || x.codeAt2 === (UPPERCASE.L as number)) &&
		x.codeAt3 === (TOKEN.L_PARENTHESIS as number)
	) {
		x.shut += 3 // Consume « url » (case-sensitive)
		x.setCodeAtCurrent()

		let restoreTokenPosition = x.shut

		while (isWhitespace(x.codeAt1) && isWhitespace(x.codeAt2)) {
			x.shut += 1
			x.setCodeAtCurrent()
		}

		if (
			x.codeAt1 === TOKEN.SINGLE_QUOTE ||
			x.codeAt1 === TOKEN.DOUBLE_QUOTE ||
			(isWhitespace(x.codeAt1) && (x.codeAt2 === TOKEN.SINGLE_QUOTE || x.codeAt2 === TOKEN.DOUBLE_QUOTE))
		) {
			x.tail = 1
			x.shut = restoreTokenPosition + 1 // Consume « url( » (case-sensitive)
			x.setCodeAtCurrent()

			return {
				type: NODE_TYPE.FUNCTION_TOKEN,
				symb: NODE_SYMB.FUNCTION_TOKEN,
				flag: x.flag,
				node: x.code.slice(x.open, x.shut - x.tail),
				shut: '(',
				spot: {
					offsetIni: x.open,
					offsetEnd: x.shut,
				},
			}
		}

		x.lead = 4
		x.shut += 1 // Consume remaining « U+0028 LEFT PARENTHESIS (() »
		x.setCodeAtCurrent()
		consumeUrlToken(x)

		return {
			type: NODE_TYPE.URL_TOKEN,
			symb: x.type as any,
			flag: x.flag,
			node: x.code.slice(x.open + x.lead, x.shut - x.tail),
			open: x.code.slice(x.open, x.open + x.lead),
			shut: x.code.slice(x.shut - x.tail, x.shut),
			spot: {
				offsetIni: x.open,
				offsetEnd: x.shut,
			},
		}
	}

	consumeIdentifier(x)

	if (x.codeAt0 === TOKEN.L_PARENTHESIS) {
		x.type = NODE_SYMB.FUNCTION_TOKEN
		x.tail = 1
		x.shut += 1
		return {
			type: NODE_TYPE.FUNCTION_TOKEN,
			symb: NODE_SYMB.FUNCTION_TOKEN,
			flag: x.flag,
			node: x.code.slice(x.open, x.shut - x.tail),
			shut: '(',
			spot: {
				offsetIni: x.open,
				offsetEnd: x.shut,
			},
		}
	}

	return {
		type: NODE_TYPE.IDENT_TOKEN,
		symb: NODE_SYMB.IDENT_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open, x.shut - x.tail),
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
