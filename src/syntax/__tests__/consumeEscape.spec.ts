import { SYNTAX_TYPE, SYNTAX_SYMB, FLAG_ANY } from '~/constants'
import { getTokens } from './functions'
import { arrEscaped } from './include'
import type { CSSIdentifier, CSSDelimiter, CSSWhitespace } from '~/shared/types'

describe('Algorithms: consume escaped <ident-token>', () => {
	it('should consume an escaped <ident-token>', () => {
		const styles = arrEscaped.join('\t\t')
		const tokens = getTokens(styles)
		const escape = tokens.filter(t => t.type === SYNTAX_TYPE.IDENT_TOKEN)

		expect(escape).toHaveLength(arrEscaped.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		escape.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSIdentifier>>({
				type: SYNTAX_TYPE.IDENT_TOKEN,
				symb: SYNTAX_SYMB.IDENT_TOKEN,
				flag: 0, // No parse error
				node: arrEscaped[i],
			})
		})
	})
	it('should consume <delim-token> with parse error if ends with EOF', () => {
		const styles = ['\\' /* 0 */].join('')
		const tokens = getTokens(styles)

		expect(tokens).toHaveLength(2)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_ANY.PARSE_ERROR

		expect(tokens[0]).toMatchObject<Partial<CSSDelimiter>>({
			type: SYNTAX_TYPE.DELIMITER_TOKEN,
			symb: SYNTAX_SYMB.DELIMITER_TOKEN,
			flag: bitErr,
			node: '\\',
		})
	})
	it('should consume <delim-token> with parse error if invalid escape', () => {
		const styles = ['\\' /* 0 */, , '\n'].join('')
		const tokens = getTokens(styles)

		expect(tokens).toHaveLength(3)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_ANY.PARSE_ERROR

		expect(tokens[0]).toMatchObject<Partial<CSSDelimiter>>({
			type: SYNTAX_TYPE.DELIMITER_TOKEN,
			symb: SYNTAX_SYMB.DELIMITER_TOKEN,
			flag: bitErr,
			node: '\\',
		})
		expect(tokens[1]).toMatchObject<Partial<CSSWhitespace>>({
			type: SYNTAX_TYPE.WHITESPACE_TOKEN,
			symb: SYNTAX_SYMB.WHITESPACE_TOKEN,
			flag: 0, // No parse error
			node: '\n',
		})
	})
	it('should consume <ident-token> with parse error if ends with EOF', () => {
		const styles = ['ident\\' /* 0 */].join('')
		const tokens = getTokens(styles)

		expect(tokens).toHaveLength(2)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_ANY.PARSE_ERROR

		expect(tokens[0]).toMatchObject<Partial<CSSIdentifier>>({
			type: SYNTAX_TYPE.IDENT_TOKEN,
			symb: SYNTAX_SYMB.IDENT_TOKEN,
			flag: bitErr,
			node: 'ident\\',
		})
	})
	it('should consume <ident-token> with parse error if ends with EOF', () => {
		const styles = ['ident\\' /* 0 */].join('')
		const tokens = getTokens(styles)

		expect(tokens).toHaveLength(2)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_ANY.PARSE_ERROR

		expect(tokens[0]).toMatchObject<Partial<CSSIdentifier>>({
			type: SYNTAX_TYPE.IDENT_TOKEN,
			symb: SYNTAX_SYMB.IDENT_TOKEN,
			flag: bitErr,
			node: 'ident\\',
		})
	})
})
