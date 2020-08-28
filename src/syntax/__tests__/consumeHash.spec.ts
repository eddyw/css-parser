import { SYNTAX_TYPE, SYNTAX_SYMB, FLAG_IDENTIFIER } from '~/constants'
import { getTokens } from './functions'
import { arrIdentifiers } from './include'
import type { CSSHash, CSSDelimiter } from '~/shared/types'

describe('Algorithms: consume hash identifier', () => {
	it('should consume an <hash-token> with ID flag', () => {
		const styles = arrIdentifiers.map(id => `#${id}`).join('{ }\n')
		const tokens = getTokens(styles)
		const idents = tokens.filter(t => t.type === SYNTAX_TYPE.HASH_TOKEN)

		expect(idents).toHaveLength(arrIdentifiers.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		const bitHash = 0 | FLAG_IDENTIFIER.HASH_IDENT

		idents.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSHash>>({
				type: SYNTAX_TYPE.HASH_TOKEN,
				symb: SYNTAX_SYMB.HASH_TOKEN,
				flag: bitHash,
				node: arrIdentifiers[i],
			})
		})
	})
	it('should consume a <delim-token> « # »', () => {
		const styles = `#\t`
		const tokens = getTokens(styles)
		const delims = tokens.filter(t => t.type === SYNTAX_TYPE.DELIMITER_TOKEN)

		expect(delims).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		expect(delims[0]).toMatchObject<Partial<CSSDelimiter>>({
			type: SYNTAX_TYPE.DELIMITER_TOKEN,
			symb: SYNTAX_SYMB.DELIMITER_TOKEN,
			flag: 0,
			node: '#',
		})
	})
})
