import { NODE_TYPE, NODE_SYMB, FLAG_URL } from '~/constants'
import { getTokens } from './functions'
import { arrUrlToken, arrBadUrlNonPrintable } from './include'
import type { CSSUrl } from '~/shared/types'

describe('Algorithms: consume url', () => {
	it('should consume an <url-token>', () => {
		const styles = arrUrlToken.map(id => `${id}`).join(';\n')
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(urlTok).toHaveLength(arrUrlToken.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		urlTok.forEach((token, i) => {
			const node = arrUrlToken[i].slice(4, -1)
			const open = arrUrlToken[i].slice(0, 4)
			const shut = arrUrlToken[i].slice(-1)

			expect(open).toMatch(/^url\($/i)
			expect(shut).toStrictEqual(')')

			expect(token).toMatchObject<Partial<CSSUrl>>({
				type: NODE_TYPE.URL_TOKEN,
				symb: NODE_SYMB.URL_TOKEN,
				flag: 0, // No parse error
				node,
				open,
				shut,
			})
		})
	})
	it('should consume <url-token> with parse error if ends with EOF', () => {
		const styles = `url(`
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(tokens).toHaveLength(2)
		expect(urlTok).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_URL.PARSE_ERROR | FLAG_URL.END_IS_EOF

		expect(urlTok[0]).toMatchObject<Partial<CSSUrl>>({
			type: NODE_TYPE.URL_TOKEN,
			symb: NODE_SYMB.URL_TOKEN,
			flag: bitErr,
			node: '',
			open: 'url(',
			shut: '',
		})
	})
	it('should consume <url-token> with parse error if ends with EOF (with whitespace)', () => {
		const styles = `url(\t`
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(tokens).toHaveLength(2)
		expect(urlTok).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_URL.PARSE_ERROR | FLAG_URL.END_IS_EOF

		expect(urlTok[0]).toMatchObject<Partial<CSSUrl>>({
			type: NODE_TYPE.URL_TOKEN,
			symb: NODE_SYMB.URL_TOKEN,
			flag: bitErr,
			node: '\t',
			open: 'url(',
			shut: '',
		})
	})
	it('should consume <bad-url-token> (with whitespace)', () => {
		const styles = `url(/some\t\t/thing.png)`
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(tokens).toHaveLength(2)
		expect(urlTok).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_URL.BAD_URL

		expect(urlTok[0]).toMatchObject<Partial<CSSUrl>>({
			type: NODE_TYPE.URL_TOKEN,
			symb: NODE_SYMB.URL_TOKEN,
			flag: bitErr,
			node: '/some\t\t/thing.png',
			open: 'url(',
			shut: ')',
		})
	})
	it('should consume <bad-url-token> (with non-printable, quotes, parenthesis)', () => {
		const styles = arrBadUrlNonPrintable.map(id => `${id}`).join(';\n')
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(urlTok).toHaveLength(arrBadUrlNonPrintable.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_URL.PARSE_ERROR | FLAG_URL.BAD_URL | FLAG_URL.NON_PRINTABLE

		urlTok.forEach((token, i) => {
			const node = arrBadUrlNonPrintable[i].slice(4, -1)
			const open = arrBadUrlNonPrintable[i].slice(0, 4)
			const shut = arrBadUrlNonPrintable[i].slice(-1)

			expect(open).toMatch(/^url\($/i)
			expect(shut).toStrictEqual(')')

			expect(token).toMatchObject<Partial<CSSUrl>>({
				type: NODE_TYPE.URL_TOKEN,
				symb: NODE_SYMB.URL_TOKEN,
				flag: bitErr,
				node,
				open,
				shut,
			})
		})
	})
	it('should consume <bad-url-token> (with invalid escape)', () => {
		const styles = `url(/some\\\n/thing.png)`
		const tokens = getTokens(styles)
		const urlTok = tokens.filter(t => t.type === NODE_TYPE.URL_TOKEN)

		expect(tokens).toHaveLength(2)
		expect(urlTok).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(NODE_TYPE.END_OF_FILE)

		const bitErr = 0 | FLAG_URL.PARSE_ERROR | FLAG_URL.BAD_URL | FLAG_URL.BAD_ESCAPE

		expect(urlTok[0]).toMatchObject<Partial<CSSUrl>>({
			type: NODE_TYPE.URL_TOKEN,
			symb: NODE_SYMB.URL_TOKEN,
			flag: bitErr,
			node: '/some\\\n/thing.png',
			open: 'url(',
			shut: ')',
		})
	})
})
