import { TOKEN } from '~/constants'
import { areValidEscape } from '~/syntax/definitions'
import { consumeEscapedCodePoint } from '.'
import type { TokenizerContext } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-remnants-of-bad-url
 * @description § 4.3.14. Consume the remnants of a bad url
 * This section describes how to consume the remnants of a bad url from a stream of code points,
 * "cleaning up" after the tokenizer realizes that it’s in the middle of a <bad-url-token> rather than a <url-token>.
 * It returns nothing; its sole use is to consume enough of the input stream to reach a recovery point where normal tokenizing can resume.
 *
 * Repeatedly consume the next input code point from the stream:
 *
 * 	U+0029 RIGHT PARENTHESIS ())
 * 	EOF
 * 		Return.
 * 	the input stream starts with a valid escape
 * 		Consume an escaped code point.
 * 		This allows an escaped right parenthesis ("\)") to be encountered without ending the <bad-url-token>.
 * 		This is otherwise identical to the "anything else" clause.
 * 	anything else
 * 		Do nothing.
 */
export function consumeBadUrlRemnants(x: TokenizerContext): void {
	for (; x.shut < x.size; x.shut++) {
		x.setCodeAtCurrent()
		if (x.codeAt0 === TOKEN.R_PARENTHESIS) {
			x.shut += 1 // Consume U+0029 RIGHT PARENTHESIS ())
			x.tail = 1
			break
		}
		if (areValidEscape(x.codeAt0, x.codeAt1)) {
			x.shut += 1 // Consume U+005C REVERSE SOLIDUS (\)
			x.setCodeAtCurrent()
			consumeEscapedCodePoint(x)
		}
	}
}
