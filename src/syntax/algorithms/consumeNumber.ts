import { TOKEN, LOWERCASE, FLAG_NUMBER, UPPERCASE } from '~/constants'
import { isDigit } from '~/syntax/definitions'
import { consumeDigits } from '.'
import type { SyntaxTokenizerContext } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-number
 * @description § 4.3.12. Consume a number
 * 1. Initially set type to "integer". Let repr be the empty string.
 * 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-), consume it and append it to repr.
 * 3. While the next input code point is a digit, consume it and append it to repr.
 * 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
 *    1. Consume them.
 *    2. Append them to repr.
 *    2. Set type to "number".
 *    3. While the next input code point is a digit, consume it and append it to repr.
 * 5. If the next 2 or 3 input code points are
 *  U+0045 LATIN CAPITAL LETTER E (E) or U+0065 LATIN SMALL LETTER E (e),
 *  optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+),
 *  followed by a digit, then:
 *    1. Consume them.
 *    2. Append them to repr.
 *    3. Set type to "number".
 *    4. While the next input code point is a digit, consume it and append it to repr.
 * 6. Convert repr to a number, and set the value to the returned value.
 * 7. Return value and type.
 */
export function consumeNumber(x: SyntaxTokenizerContext): void {
	x.flag |= FLAG_NUMBER.INTEGER

	if (x.codeAt0 === TOKEN.PLUS || x.codeAt0 === TOKEN.MINUS) {
		x.shut += 1 // Consume « (+) or (-) »
	}
	consumeDigits(x)

	if (x.codeAt0 === TOKEN.STOP && isDigit(x.codeAt1)) {
		x.shut += 2 // Consume « U+002E FULL STOP (.) AND [digit] »
		x.flag |= FLAG_NUMBER.DOUBLE
		x.flag = ~(~x.flag | FLAG_NUMBER.INTEGER) // Unset INTEGER
		consumeDigits(x)
	}

	if (x.codeAt0 === UPPERCASE.E || x.codeAt0 === LOWERCASE.E) {
		if ((x.codeAt1 === TOKEN.PLUS || x.codeAt1 === TOKEN.MINUS) && isDigit(x.codeAt2)) {
			x.shut += 3 // Consume « E|e » & « +|- » & « [digit] »
			x.flag |= FLAG_NUMBER.DOUBLE
			x.flag = ~(~x.flag | FLAG_NUMBER.INTEGER) // Unset INTEGER
			consumeDigits(x)
		} else if (isDigit(x.codeAt1)) {
			x.shut += 2 // Consume « E|e » & « [digit] »
			x.flag |= FLAG_NUMBER.DOUBLE
			x.flag = ~(~x.flag | FLAG_NUMBER.INTEGER) // Unset INTEGER
			consumeDigits(x)
		}
	}

	x.setCodeAtCurrent()
}
