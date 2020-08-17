import { NODE_SYMB, NODE_TYPE, FLAG_STRING } from '~/constants'
import { getTokens } from './functions'
import { arrStrings } from './include'
import type { CSSString } from '~/shared/types'

describe('Algorithms: consume string tokens', () => {
	it('should consume valid <string-token>', () => {
		const quotes = [`"`, `'`]
		const styles = arrStrings.join('\t')
		const tokens = getTokens(styles) as CSSString[]
		const string = tokens.filter(t => t.type === NODE_TYPE.STRING_TOKEN)

		expect(string).toHaveLength(arrStrings.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		string.forEach((token, i) => {
			const node = arrStrings[i].slice(1, -1)
			const open = arrStrings[i].slice(0, 1) as '"'
			const shut = arrStrings[i].slice(-1) as '"'

			expect(open).toStrictEqual(shut)
			expect(quotes).toEqual(expect.arrayContaining([open, shut]))

			expect(token).toMatchObject<Partial<CSSString>>({
				type: NODE_TYPE.STRING_TOKEN,
				symb: NODE_SYMB.STRING_TOKEN,
				flag: 0, // No parse error
				node,
				open,
				shut,
			})
		})
	})
	it('should consume <string-token> with parse error if ends with EOF', () => {
		const styles = [`"unclosed string` /* 0 */].join('')
		const tokens = getTokens(styles)
		const string = tokens.filter(t => t.type === NODE_TYPE.STRING_TOKEN)

		expect(string).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_STRING.PARSE_ERROR | FLAG_STRING.END_IS_EOF

		expect(tokens[0]).toMatchObject<Partial<CSSString>>({
			type: NODE_TYPE.STRING_TOKEN,
			symb: NODE_SYMB.STRING_TOKEN,
			flag: bitErr,
			node: `unclosed string`,
			open: `"`,
			shut: ``,
		})
	})
	it('should consume <string-token> with parse error if ends with escaped EOF', () => {
		const styles = [`"unclosed string\\` /* 0 */].join('')
		const tokens = getTokens(styles)
		const string = tokens.filter(t => t.type === NODE_TYPE.STRING_TOKEN)

		expect(string).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_STRING.PARSE_ERROR | FLAG_STRING.END_IS_ESCAPED_EOF

		expect(tokens[0]).toMatchObject<Partial<CSSString>>({
			type: NODE_TYPE.STRING_TOKEN,
			symb: NODE_SYMB.STRING_TOKEN,
			flag: bitErr,
			node: `unclosed string\\`,
			open: `"`,
			shut: ``,
		})
	})
	it('should consume <bad-string-token> with parse error if ends with unescaped newline', () => {
		const styles = [`"unclosed string` /* 0 */, '\n' /* 1 */].join('')
		const tokens = getTokens(styles)
		const string = tokens.filter(t => t.type === NODE_TYPE.STRING_TOKEN)

		expect(string).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_STRING.PARSE_ERROR | FLAG_STRING.BAD_STRING | FLAG_STRING.END_IS_NEWLINE

		expect(tokens[0]).toMatchObject<Partial<CSSString>>({
			type: NODE_TYPE.STRING_TOKEN,
			symb: NODE_SYMB.STRING_TOKEN,
			flag: bitErr,
			node: `unclosed string`,
			open: `"`,
			shut: ``,
		})
	})
})
