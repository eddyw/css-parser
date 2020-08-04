import { TYPE, FLAGS_NUMBER } from '~/constants'
import { getTokens, getTokenValue } from './functions'

describe('Tokenize Algorithm - consumeNumericToken', () => {
	it('should consume Int <number-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'1' /* 1 */,
			'\n\n\t' /* 2 */,
			'-123456' /* 3 */,
			'\n\t\t' /* 4 */,
			'456' /* 5 */,
			' ' /* 6 */,
			'+789' /* 7 */,
		].join('')
		const tokens = getTokens(inputs)
		const digits = tokens.filter(t => t.tokenType === TYPE.NUMBER)

		expect(tokens.length).toBe(9)
		expect(digits.length).toBe(4)
		expect(tokens[1].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[3].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[5].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[7].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[8].tokenType).toBe(TYPE.EOF)

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)

		expect(getTokenValue(inputs, tokens[1])).toBe('1')
		expect(getTokenValue(inputs, tokens[3])).toBe('-123456')
		expect(getTokenValue(inputs, tokens[5])).toBe('456')
		expect(getTokenValue(inputs, tokens[7])).toBe('+789')
	})
	it('should consume Float <number-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'.1' /* 1 */,
			'\t' /* 2 */,
			'+.1' /* 3 */,
			'\t' /* 4 */,
			'-.1' /* 5 */,
			'\t' /* 6 */,
			'1.2' /* 7 */,
			'\t' /* 8 */,
			'+1.2' /* 9 */,
			'\t' /* 10 */,
			'-1.2' /* 11 */,
			'\t' /* 12 ---- */,
			'.1e1' /* 13 */,
			'\t' /* 14 */,
			'+.1e1' /* 15 */,
			'\t' /* 16 */,
			'-.1e1' /* 17 */,
			'\t' /* 18 */,
			'1.2e1' /* 19 */,
			'\t' /* 20 */,
			'+1.2e1' /* 21 */,
			'\t' /* 22 */,
			'-1.2e1' /* 23 */,
			'\t' /* 24 ---- */,
			'.1e+1' /* 25 */,
			'\t' /* 26 */,
			'+.1e+1' /* 27 */,
			'\t' /* 28 */,
			'-.1e+1' /* 29 */,
			'\t' /* 30 */,
			'1.2e+1' /* 31 */,
			'\t' /* 32 */,
			'+1.2e+1' /* 33 */,
			'\t' /* 34 */,
			'-1.2e+1' /* 35 */,
			'\t' /* 36 ---- */,
			'.1e-1' /* 37 */,
			'\t' /* 38 */,
			'+.1e-1' /* 39 */,
			'\t' /* 40 */,
			'-.1e-1' /* 41 */,
			'\t' /* 42 */,
			'1.2e-1' /* 43 */,
			'\t' /* 44 */,
			'+1.2e-1' /* 45 */,
			'\t' /* 46 */,
			'-1.2e-1' /* 47 */,
			'\t' /* 48 ---- */,
		]
		const css = inputs.join('')
		const tokens = getTokens(css)
		const digits = tokens.filter(t => t.tokenType === TYPE.NUMBER)

		expect(tokens.length).toBe(50)
		expect(digits.length).toBe(24)
		expect(tokens[1].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[3].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[5].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[7].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[9].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[11].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[13].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[15].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[17].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[19].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[21].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[23].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[25].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[27].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[29].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[31].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[33].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[35].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[37].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[39].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[41].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[43].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[45].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[47].tokenType).toBe(TYPE.NUMBER)
		expect(tokens[49].tokenType).toBe(TYPE.EOF)

		expect(getTokenValue(css, tokens[1])).toBe('.1')
		expect(getTokenValue(css, tokens[3])).toBe('+.1')
		expect(getTokenValue(css, tokens[5])).toBe('-.1')
		expect(getTokenValue(css, tokens[7])).toBe('1.2')
		expect(getTokenValue(css, tokens[9])).toBe('+1.2')
		expect(getTokenValue(css, tokens[11])).toBe('-1.2')
		expect(getTokenValue(css, tokens[13])).toBe('.1e1')
		expect(getTokenValue(css, tokens[15])).toBe('+.1e1')
		expect(getTokenValue(css, tokens[17])).toBe('-.1e1')
		expect(getTokenValue(css, tokens[19])).toBe('1.2e1')
		expect(getTokenValue(css, tokens[21])).toBe('+1.2e1')
		expect(getTokenValue(css, tokens[23])).toBe('-1.2e1')
		expect(getTokenValue(css, tokens[25])).toBe('.1e+1')
		expect(getTokenValue(css, tokens[27])).toBe('+.1e+1')
		expect(getTokenValue(css, tokens[29])).toBe('-.1e+1')
		expect(getTokenValue(css, tokens[31])).toBe('1.2e+1')
		expect(getTokenValue(css, tokens[33])).toBe('+1.2e+1')
		expect(getTokenValue(css, tokens[35])).toBe('-1.2e+1')
		expect(getTokenValue(css, tokens[37])).toBe('.1e-1')
		expect(getTokenValue(css, tokens[39])).toBe('+.1e-1')
		expect(getTokenValue(css, tokens[41])).toBe('-.1e-1')
		expect(getTokenValue(css, tokens[43])).toBe('1.2e-1')
		expect(getTokenValue(css, tokens[45])).toBe('+1.2e-1')
		expect(getTokenValue(css, tokens[47])).toBe('-1.2e-1')

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[9].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[11].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[13].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[15].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[17].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[19].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[21].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[23].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[25].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[27].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[29].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[31].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[33].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[35].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[37].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[39].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[41].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[43].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[45].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[47].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
	})
	it('should consume Int <percentage-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'1%' /* 1 */,
			'\n\n\t' /* 2 */,
			'-123456%' /* 3 */,
			'\n\t\t' /* 4 */,
			'456%' /* 5 */,
			' ' /* 6 */,
			'+789%' /* 7 */,
		].join('')
		const tokens = getTokens(inputs)
		const digits = tokens.filter(t => t.tokenType === TYPE.PERCENTAGE)

		expect(tokens.length).toBe(9)
		expect(digits.length).toBe(4)
		expect(tokens[1].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[3].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[5].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[7].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[8].tokenType).toBe(TYPE.EOF)

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)

		expect(getTokenValue(inputs, tokens[1])).toBe('1%')
		expect(getTokenValue(inputs, tokens[3])).toBe('-123456%')
		expect(getTokenValue(inputs, tokens[5])).toBe('456%')
		expect(getTokenValue(inputs, tokens[7])).toBe('+789%')
	})
	it('should consume Float <percentage-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'.1%' /* 1 */,
			'\t' /* 2 */,
			'+.1%' /* 3 */,
			'\t' /* 4 */,
			'-.1%' /* 5 */,
			'\t' /* 6 */,
			'1.2%' /* 7 */,
			'\t' /* 8 */,
			'+1.2%' /* 9 */,
			'\t' /* 10 */,
			'-1.2%' /* 11 */,
			'\t' /* 12 ---- */,
			'.1e1%' /* 13 */,
			'\t' /* 14 */,
			'+.1e1%' /* 15 */,
			'\t' /* 16 */,
			'-.1e1%' /* 17 */,
			'\t' /* 18 */,
			'1.2e1%' /* 19 */,
			'\t' /* 20 */,
			'+1.2e1%' /* 21 */,
			'\t' /* 22 */,
			'-1.2e1%' /* 23 */,
			'\t' /* 24 ---- */,
			'.1e+1%' /* 25 */,
			'\t' /* 26 */,
			'+.1e+1%' /* 27 */,
			'\t' /* 28 */,
			'-.1e+1%' /* 29 */,
			'\t' /* 30 */,
			'1.2e+1%' /* 31 */,
			'\t' /* 32 */,
			'+1.2e+1%' /* 33 */,
			'\t' /* 34 */,
			'-1.2e+1%' /* 35 */,
			'\t' /* 36 ---- */,
			'.1e-1%' /* 37 */,
			'\t' /* 38 */,
			'+.1e-1%' /* 39 */,
			'\t' /* 40 */,
			'-.1e-1%' /* 41 */,
			'\t' /* 42 */,
			'1.2e-1%' /* 43 */,
			'\t' /* 44 */,
			'+1.2e-1%' /* 45 */,
			'\t' /* 46 */,
			'-1.2e-1%' /* 47 */,
			'\t' /* 48 ---- */,
		]
		const css = inputs.join('')
		const tokens = getTokens(css)
		const digits = tokens.filter(t => t.tokenType === TYPE.PERCENTAGE)

		expect(tokens.length).toBe(50)
		expect(digits.length).toBe(24)
		expect(tokens[1].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[3].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[5].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[7].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[9].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[11].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[13].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[15].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[17].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[19].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[21].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[23].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[25].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[27].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[29].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[31].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[33].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[35].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[37].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[39].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[41].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[43].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[45].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[47].tokenType).toBe(TYPE.PERCENTAGE)
		expect(tokens[49].tokenType).toBe(TYPE.EOF)

		expect(getTokenValue(css, tokens[1])).toBe('.1%')
		expect(getTokenValue(css, tokens[3])).toBe('+.1%')
		expect(getTokenValue(css, tokens[5])).toBe('-.1%')
		expect(getTokenValue(css, tokens[7])).toBe('1.2%')
		expect(getTokenValue(css, tokens[9])).toBe('+1.2%')
		expect(getTokenValue(css, tokens[11])).toBe('-1.2%')
		expect(getTokenValue(css, tokens[13])).toBe('.1e1%')
		expect(getTokenValue(css, tokens[15])).toBe('+.1e1%')
		expect(getTokenValue(css, tokens[17])).toBe('-.1e1%')
		expect(getTokenValue(css, tokens[19])).toBe('1.2e1%')
		expect(getTokenValue(css, tokens[21])).toBe('+1.2e1%')
		expect(getTokenValue(css, tokens[23])).toBe('-1.2e1%')
		expect(getTokenValue(css, tokens[25])).toBe('.1e+1%')
		expect(getTokenValue(css, tokens[27])).toBe('+.1e+1%')
		expect(getTokenValue(css, tokens[29])).toBe('-.1e+1%')
		expect(getTokenValue(css, tokens[31])).toBe('1.2e+1%')
		expect(getTokenValue(css, tokens[33])).toBe('+1.2e+1%')
		expect(getTokenValue(css, tokens[35])).toBe('-1.2e+1%')
		expect(getTokenValue(css, tokens[37])).toBe('.1e-1%')
		expect(getTokenValue(css, tokens[39])).toBe('+.1e-1%')
		expect(getTokenValue(css, tokens[41])).toBe('-.1e-1%')
		expect(getTokenValue(css, tokens[43])).toBe('1.2e-1%')
		expect(getTokenValue(css, tokens[45])).toBe('+1.2e-1%')
		expect(getTokenValue(css, tokens[47])).toBe('-1.2e-1%')

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[9].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[11].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[13].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[15].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[17].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[19].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[21].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[23].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[25].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[27].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[29].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[31].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[33].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[35].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[37].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[39].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[41].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[43].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[45].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[47].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
	})
	it('should consume Int <dimension-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'1px' /* 1 */,
			'\n\n\t' /* 2 */,
			'-123456px' /* 3 */,
			'\n\t\t' /* 4 */,
			'456px' /* 5 */,
			' ' /* 6 */,
			'+789px' /* 7 */,
		].join('')
		const tokens = getTokens(inputs)
		const digits = tokens.filter(t => t.tokenType === TYPE.DIMENSION)

		expect(tokens.length).toBe(9)
		expect(digits.length).toBe(4)
		expect(tokens[1].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[3].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[5].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[7].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[8].tokenType).toBe(TYPE.EOF)

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_INTEGER)).toBe(true)

		expect(getTokenValue(inputs, tokens[1])).toBe('1px')
		expect(getTokenValue(inputs, tokens[3])).toBe('-123456px')
		expect(getTokenValue(inputs, tokens[5])).toBe('456px')
		expect(getTokenValue(inputs, tokens[7])).toBe('+789px')
	})
	it('should consume Float <dimension-token>', () => {
		const inputs = [
			'\t' /* 0 */,
			'.1px' /* 1 */,
			'\t' /* 2 */,
			'+.1px' /* 3 */,
			'\t' /* 4 */,
			'-.1px' /* 5 */,
			'\t' /* 6 */,
			'1.2px' /* 7 */,
			'\t' /* 8 */,
			'+1.2px' /* 9 */,
			'\t' /* 10 */,
			'-1.2px' /* 11 */,
			'\t' /* 12 ---- */,
			'.1e1px' /* 13 */,
			'\t' /* 14 */,
			'+.1e1px' /* 15 */,
			'\t' /* 16 */,
			'-.1e1px' /* 17 */,
			'\t' /* 18 */,
			'1.2e1px' /* 19 */,
			'\t' /* 20 */,
			'+1.2e1px' /* 21 */,
			'\t' /* 22 */,
			'-1.2e1px' /* 23 */,
			'\t' /* 24 ---- */,
			'.1e+1px' /* 25 */,
			'\t' /* 26 */,
			'+.1e+1px' /* 27 */,
			'\t' /* 28 */,
			'-.1e+1px' /* 29 */,
			'\t' /* 30 */,
			'1.2e+1px' /* 31 */,
			'\t' /* 32 */,
			'+1.2e+1px' /* 33 */,
			'\t' /* 34 */,
			'-1.2e+1px' /* 35 */,
			'\t' /* 36 ---- */,
			'.1e-1px' /* 37 */,
			'\t' /* 38 */,
			'+.1e-1px' /* 39 */,
			'\t' /* 40 */,
			'-.1e-1px' /* 41 */,
			'\t' /* 42 */,
			'1.2e-1px' /* 43 */,
			'\t' /* 44 */,
			'+1.2e-1px' /* 45 */,
			'\t' /* 46 */,
			'-1.2e-1px' /* 47 */,
			'\t' /* 48 ---- */,
		]
		const css = inputs.join('')
		const tokens = getTokens(css)
		const digits = tokens.filter(t => t.tokenType === TYPE.DIMENSION)

		expect(tokens.length).toBe(50)
		expect(digits.length).toBe(24)
		expect(tokens[1].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[3].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[5].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[7].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[9].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[11].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[13].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[15].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[17].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[19].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[21].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[23].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[25].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[27].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[29].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[31].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[33].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[35].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[37].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[39].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[41].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[43].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[45].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[47].tokenType).toBe(TYPE.DIMENSION)
		expect(tokens[49].tokenType).toBe(TYPE.EOF)

		expect(getTokenValue(css, tokens[1])).toBe('.1px')
		expect(getTokenValue(css, tokens[3])).toBe('+.1px')
		expect(getTokenValue(css, tokens[5])).toBe('-.1px')
		expect(getTokenValue(css, tokens[7])).toBe('1.2px')
		expect(getTokenValue(css, tokens[9])).toBe('+1.2px')
		expect(getTokenValue(css, tokens[11])).toBe('-1.2px')
		expect(getTokenValue(css, tokens[13])).toBe('.1e1px')
		expect(getTokenValue(css, tokens[15])).toBe('+.1e1px')
		expect(getTokenValue(css, tokens[17])).toBe('-.1e1px')
		expect(getTokenValue(css, tokens[19])).toBe('1.2e1px')
		expect(getTokenValue(css, tokens[21])).toBe('+1.2e1px')
		expect(getTokenValue(css, tokens[23])).toBe('-1.2e1px')
		expect(getTokenValue(css, tokens[25])).toBe('.1e+1px')
		expect(getTokenValue(css, tokens[27])).toBe('+.1e+1px')
		expect(getTokenValue(css, tokens[29])).toBe('-.1e+1px')
		expect(getTokenValue(css, tokens[31])).toBe('1.2e+1px')
		expect(getTokenValue(css, tokens[33])).toBe('+1.2e+1px')
		expect(getTokenValue(css, tokens[35])).toBe('-1.2e+1px')
		expect(getTokenValue(css, tokens[37])).toBe('.1e-1px')
		expect(getTokenValue(css, tokens[39])).toBe('+.1e-1px')
		expect(getTokenValue(css, tokens[41])).toBe('-.1e-1px')
		expect(getTokenValue(css, tokens[43])).toBe('1.2e-1px')
		expect(getTokenValue(css, tokens[45])).toBe('+1.2e-1px')
		expect(getTokenValue(css, tokens[47])).toBe('-1.2e-1px')

		expect(!!(tokens[1].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[3].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[5].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[7].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[9].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[11].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[13].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[15].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[17].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[19].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[21].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[23].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[25].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[27].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[29].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[31].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[33].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[35].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[37].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[39].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[41].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[43].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[45].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
		expect(!!(tokens[47].tokenFlag & FLAGS_NUMBER.IS_DOUBLE)).toBe(true)
	})
})
