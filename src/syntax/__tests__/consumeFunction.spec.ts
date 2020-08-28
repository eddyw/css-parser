import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import { arrIdentifiers } from './include'
import type { CSSFunctionToken } from '~/shared/types'

describe('Algorithms: consume <function-token>', () => {
	it('should consume a <function-token>', () => {
		const styles = arrIdentifiers.map(id => `${id}(1 + 2, "")`).join('\n')
		const tokens = getTokens(styles)
		const idents = tokens.filter(t => t.type === SYNTAX_TYPE.FUNCTION_TOKEN)

		expect(idents).toHaveLength(arrIdentifiers.length)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		idents.forEach((token, i) => {
			expect(token).toMatchObject<Partial<CSSFunctionToken>>({
				type: SYNTAX_TYPE.FUNCTION_TOKEN,
				symb: SYNTAX_SYMB.FUNCTION_TOKEN,
				flag: 0, // No parse error
				node: arrIdentifiers[i],
				shut: '(',
			})
		})
	})
})
