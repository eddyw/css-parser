import { TOKEN, NODE_SYMB, NODE_TYPE, FLAG_IDENTIFIER } from '~/constants'
import { areValidEscape, isIdentifierCodePoint, areIdentifierNameStart } from '~/tokenizer/definitions'
import { consumeIdentifier } from '.'
import type { TokenizerContext, CSSHash, CSSDelimiter } from '~/shared/types'

export function consumeHash(x: TokenizerContext): Readonly<CSSHash> | Readonly<CSSDelimiter> {
	if (isIdentifierCodePoint(x.codeAt1) || areValidEscape(x.codeAt1, x.codeAt2)) {
		x.lead = 1

		if (areIdentifierNameStart(x.codeAt1, x.codeAt2, x.codeAt3)) {
			x.flag |= FLAG_IDENTIFIER.HASH_IDENT
		}
		x.shut += 1 // Consume « U+0023 NUMBER SIGN (#) »
		consumeIdentifier(x)

		return {
			type: NODE_TYPE.HASH_TOKEN,
			symb: NODE_SYMB.HASH_TOKEN,
			flag: x.flag,
			node: x.code.slice(x.open + x.lead, x.shut),
			open: '#',
			spot: {
				offsetIni: x.open,
				offsetEnd: x.shut,
			},
		}
	}

	return {
		type: NODE_TYPE.DELIMITER_TOKEN,
		symb: NODE_SYMB.DELIMITER_TOKEN,
		flag: x.flag,
		code: TOKEN.HASH,
		node: '#',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0023 NUMBER SIGN (#) »
		},
	}
}
