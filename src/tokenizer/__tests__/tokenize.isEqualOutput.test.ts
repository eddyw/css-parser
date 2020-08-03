import * as fs from 'fs'
import { tokenizer, createContext } from '~'

const input = fs.readFileSync(require.resolve('bootstrap/dist/css/bootstrap.css'), { encoding: 'utf-8' })

describe('Tokenizer – Rebuilding the output from tokens', () => {
	it('should equal to input', () => {
		const tokens: string[] = []
		const stream = tokenizer(createContext(input))

		do {
			const { tokenOpen, tokenShut } = stream.consumeToken()
			const value = input.slice(tokenOpen, tokenShut)

			tokens.push(value)
		} while (!stream.isDone())

		const output = tokens.join('')

		expect(output.length).toStrictEqual(input.length)
		expect(output).toStrictEqual(input)
	})
})
