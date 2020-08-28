import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import { arrIdentifiers } from './include'
import type { CSSAtKeyword, CSSDelimiter } from '~/shared/types'

describe('Algorithms: consume <at-keyword-token>', () => {
	it('should consume an <at-keyword-token>', () => {
		const styles = arrIdentifiers.map(id => `@${id}`).join('{ }\n')
		const tokens = getTokens(styles)
		const idents = tokens.filter(t => t.type === SYNTAX_TYPE.AT_KEYWORD_TOKEN)

		// console.dir(tokens)

		expect(idents).toHaveLength(arrIdentifiers.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		idents.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSAtKeyword>>({
				type: SYNTAX_TYPE.AT_KEYWORD_TOKEN,
				symb: SYNTAX_SYMB.AT_KEYWORD_TOKEN,
				flag: 0, // No parse error
				node: arrIdentifiers[i],
				open: '@',
			})
		})
	})
	it('should consume a <delim-token> « @ »', () => {
		const styles = `@\t`
		const tokens = getTokens(styles)
		const delims = tokens.filter(t => t.type === SYNTAX_TYPE.DELIMITER_TOKEN)

		expect(delims).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		expect(delims[0]).toMatchObject<Partial<CSSDelimiter>>({
			type: SYNTAX_TYPE.DELIMITER_TOKEN,
			symb: SYNTAX_SYMB.DELIMITER_TOKEN,
			flag: 0,
			node: '@',
		})
	})
})
