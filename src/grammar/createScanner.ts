import type { ParserOptions, ParserScanner } from './shared'

/**
 * @todo
 *
 * - Rename identifier to Keyword (type / kind) - DONE
 * - finalize getAtIdentifierOrToken
 * - What is token
 * 		-> Token can be ( ) / for example (e.g: calc & <ratio>)
 * - Error handler
 * 		- Error Constructor
 * 		- Error Messages
 * 		- Error handler
 * - Group
 * 		- If head is multiplier, get spot from multiplier.node
 */

export function createScanner(options: ParserOptions): ParserScanner {
	const text = options.text ?? ''
	const size = text.length
	const at0 = size >= 1 ? text.charCodeAt(0) : -1
	const at1 = size >= 2 ? text.charCodeAt(1) : -1
	const at2 = size >= 3 ? text.charCodeAt(2) : -1
	const offsetCol = options.offsetCol ?? 1
	const offsetLne = options.offsetLne ?? 1

	return {
		text,
		size,
		at0,
		at1,
		at2,
		open: 0,
		shut: 0,
		offsetCol,
		offsetLne,
		scan() {
			const posAt0 = this.shut
			const posAt1 = posAt0 + 1
			const posAt2 = posAt0 + 2

			this.at0 = posAt0 >= this.size ? -1 : this.text.charCodeAt(posAt0)
			this.at1 = posAt1 >= this.size ? -1 : this.text.charCodeAt(posAt1)
			this.at2 = posAt2 >= this.size ? -1 : this.text.charCodeAt(posAt2)
		},
		consume(nth) {
			this.shut += nth
			this.offsetCol += nth
			this.scan()
		},
		consumeAt0(code) {
			if (this.at0 !== code) throw Error('Unexpected token')
			this.shut += 1
			this.offsetCol += 1
			this.scan()
		},
		consumeLne() {
			this.shut += 1
			this.scan()
			this.offsetCol = 1
			this.offsetLne += 1
		},
		getPositionOpen() {
			return {
				offIni: this.shut,
				colIni: this.offsetCol,
				lneIni: this.offsetLne,
			}
		},
		getPositionShut(s) {
			return {
				offIni: s.offIni,
				offEnd: this.shut,
				colIni: s.colIni,
				colEnd: this.offsetCol,
				lneIni: s.lneIni,
				lneEnd: this.offsetLne,
			}
		},
	}
}
