import { TOKEN, SYNTAX_SYMB, SYNTAX_TYPE, FLAG_IDENTIFIER } from '~/constants'
import { areValidEscape, isIdentifierCodePoint, areIdentifierNameStart } from '~/syntax/definitions'
import { consumeIdentifier } from '.'
import type { SyntaxTokenizerContext, CSSHash, CSSDelimiter } from '~/shared/types'

export function consumeHash(x: SyntaxTokenizerContext): Readonly<CSSHash> | Readonly<CSSDelimiter> {
	if (isIdentifierCodePoint(x.codeAt1) || areValidEscape(x.codeAt1, x.codeAt2)) {
		x.lead = 1

		if (areIdentifierNameStart(x.codeAt1, x.codeAt2, x.codeAt3)) {
			x.flag |= FLAG_IDENTIFIER.HASH_IDENT
		}
		x.shut += 1 // Consume « U+0023 NUMBER SIGN (#) »
		consumeIdentifier(x)

		return {
			type: SYNTAX_TYPE.HASH_TOKEN,
			symb: SYNTAX_SYMB.HASH_TOKEN,
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
		type: SYNTAX_TYPE.DELIMITER_TOKEN,
		symb: SYNTAX_SYMB.DELIMITER_TOKEN,
		flag: x.flag,
		code: TOKEN.HASH,
		node: '#',
		spot: {
			offsetIni: x.open,
			offsetEnd: ++x.shut, // Consume « U+0023 NUMBER SIGN (#) »
		},
	}
}
