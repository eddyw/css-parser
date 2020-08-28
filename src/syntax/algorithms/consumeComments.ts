import { TOKEN, NODE_SYMB, NODE_TYPE, FLAG_ANY } from '~/constants'
import type { TokenizerContext, CSSComment } from '~/shared/types'

/**
 * @see https://drafts.csswg.org/css-syntax/#consume-comment
 * @description § 4.3.2 Consume comments
 * This section describes how to consume comments from a stream of code points.
 * It returns nothing.
 *
 * If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
 * consume them and all following code points up to and including the first U+002A ASTERISK (*)
 * followed by a U+002F SOLIDUS (/), or up to an EOF code point. Return to the start of this step.
 *
 * If the preceding paragraph ended by consuming an EOF code point, this is a parse error.
 *
 * Return nothing.
 *
 * @note - ours
 * - It assumes the next two input code points « U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*) »
 * were already verified to be comment start
 * - It returns something instead of nothing (CSSComment token)
 */
export function consumeComments(x: TokenizerContext): Readonly<CSSComment> {
	x.lead = 2
	x.shut += 2 // Consume «U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*)»

	for (; x.shut <= x.size; x.shut++) {
		x.setCodeAtCurrent()
		if (x.codeAt0 === TOKEN.ASTERISK && x.codeAt1 === TOKEN.FORWARD_SOLIDUS) {
			x.shut += 2 // Consume «U+002A ASTERISK (*) followed by a U+002F SOLIDUS (/)»
			x.tail = 2
			break
		} else if (x.codeAt0 === TOKEN.EOF) {
			x.flag |= FLAG_ANY.PARSE_ERROR
			x.shut = x.size
			break
		}
	}

	return {
		type: NODE_TYPE.COMMENT_TOKEN,
		symb: NODE_SYMB.COMMENT_TOKEN,
		flag: x.flag,
		node: x.code.slice(x.open + x.lead, x.shut - x.tail),
		open: x.code.slice(x.open, x.open + x.lead) as '/*',
		shut: x.code.slice(x.shut - x.tail, x.shut) as '*/',
		spot: {
			offsetIni: x.open,
			offsetEnd: x.shut,
		},
	}
}
