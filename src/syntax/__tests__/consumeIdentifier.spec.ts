import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import { arrIdentifiers } from './include'
import type { CSSIdentifier } from '~/shared/types'

describe('Algorithms: consume identifier', () => {
	it('should consume an <ident-token>', () => {
		const styles = arrIdentifiers.join('{ }\n')
		const tokens = getTokens(styles)
		const idents = tokens.filter(t => t.type === SYNTAX_TYPE.IDENT_TOKEN)

		expect(idents).toHaveLength(arrIdentifiers.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		idents.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSIdentifier>>({
				type: SYNTAX_TYPE.IDENT_TOKEN,
				symb: SYNTAX_SYMB.IDENT_TOKEN,
				flag: 0, // No parse error
				node: arrIdentifiers[i],
			})
		})
	})
})
