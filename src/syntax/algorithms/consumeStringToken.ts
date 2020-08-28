import { TOKEN, NODE_SYMB, FLAG_STRING, NODE_TYPE } from '~/constants'
import { isNewline, areValidEscape } from '~/syntax/definitions'
import { consumeEscapedCodePoint } from '.'
import type { TokenizerContext, CSSString } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-string-token
 * @description § 4.3.5. Consume a string token
 * This section describes how to consume a string token from a stream of code points.
 * It returns either a <string-token> or <bad-string-token>.
 *
 * This algorithm may be called with an ending code point, which denotes the code point that ends the string.
 * If an ending code point is not specified, the current input code point is used.
 *
 * Initially create a <string-token> with its value set to the empty string.
 *
 * Repeatedly consume the next input code point from the stream:
 *
 * ending code point
 * 	Return the <string-token>.
 * EOF
 * 	This is a parse error. Return the <string-token>.
 * newline
 * 	This is a parse error. Re-consume the current input code point, create a <bad-string-token>, and return it.
 * U+005C REVERSE SOLIDUS (\)
 * 	If the next input code point is EOF, do nothing.
 * 	Otherwise, if the next input code point is a newline, consume it.
 * 	Otherwise, (the stream starts with a valid escape) consume an escaped code point and append the returned code point to the <string-token>’s value.
 *
 * anything else
 * 	Append the current input code point to the <string-token>’s value.
 */
export function consumeStringToken(x: TokenizerContext, endingCodePoint: number): Readonly<CSSString> {
	x.lead = 1 // node open « U+0022 QUOTATION MARK (") | U+0027 APOSTROPHE (') »

	do {
		if (x.codeAt1 === endingCodePoint) {
			x.shut += 2 // Consume current + « U+0022 QUOTATION MARK (") | U+0027 APOSTROPHE (') »
			x.tail = 1 // node shut « U+0022 QUOTATION MARK (") | U+0027 APOSTROPHE (') »
			break
		} else if (x.codeAt1 === TOKEN.EOF) {
			x.shut += 1 // Consume current | x.codeAt1 will be re-consumed as EOF
			x.flag |= FLAG_STRING.PARSE_ERROR | FLAG_STRING.END_IS_EOF
			break
		} else if (isNewline(x.codeAt1)) {
			x.shut += 1 // Consume current | x.codeAt1 will be re-consumed as « whitespace »
			x.flag |= FLAG_STRING.PARSE_ERROR | FLAG_STRING.BAD_STRING | FLAG_STRING.END_IS_NEWLINE
			break
		} else if (x.codeAt1 === TOKEN.REVERSE_SOLIDUS) {
			if (x.codeAt2 === TOKEN.EOF) {
				x.shut += 2 // Consume current + U+005C REVERSE SOLIDUS (\) ???
				x.flag |= FLAG_STRING.PARSE_ERROR | FLAG_STRING.END_IS_ESCAPED_EOF
				break // ... and do nothing?
			}
			if (isNewline(x.codeAt2)) {
				x.shut += 3 // Consume escaped newline (\[newline])
				x.setCodeAtCurrent()
				continue
			} else if (areValidEscape(x.codeAt1, x.codeAt2)) {
				x.shut += 1 // Consume « U+005C REVERSE SOLIDUS (\) »
				x.setCodeAtCurrent()
				consumeEscapedCodePoint(x)
				continue
			}
		}
		x.shut++
		x.setCodeAtCurrent()
	} while (true)

	return {
		type: NODE_TYPE.STRING_TOKEN,
		symb: NODE_SYMB.STRING_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open + x.lead, x.shut - x.tail),
		open: x.code.slice(x.open, x.open + x.lead) as '"',
		shut: x.code.slice(x.shut - x.tail, x.shut) as '"',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
