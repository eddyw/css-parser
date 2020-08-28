import { SYNTAX_TYPE, SYNTAX_SYMB } from '~/constants'
import { getTokens } from './functions'
import type { CSSCDC } from '~/shared/types'

describe('Algorithms: consume <CDC-token>', () => {
	it('should consume a <CDC-token>', () => {
		const styles = `-->`
		const tokens = getTokens(styles)
		const cdc = tokens.filter(t => t.type === SYNTAX_TYPE.CDC_TOKEN)

		expect(cdc).toHaveLength(1)
		expect(tokens[tokens.length - 1].type).toStrictEqual(SYNTAX_TYPE.END_OF_FILE)

		expect(cdc[0]).toMatchObject<Partial<CSSCDC>>({
			type: SYNTAX_TYPE.CDC_TOKEN,
			symb: SYNTAX_SYMB.CDC_TOKEN,
			flag: 0,
			node: '-->',
		})
	})
})
