import * as path from 'path'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'

// https://github.com/rollup/rollup/issues/1089
const onwarn = (warning, rollupWarn) => {
	const ignoredWarnings = [
		{
			ignoredCode: 'CIRCULAR_DEPENDENCY',
			ignoredPath: 'src/syntax/algorithms/index.ts',
		},
		{
			ignoredCode: 'CIRCULAR_DEPENDENCY',
			ignoredPath: 'src/syntax/definitions/index.ts',
		},
		{
			ignoredCode: 'CIRCULAR_DEPENDENCY',
			ignoredPath: 'src/grammar/functions/index.ts',
		},
	]
	if (
		!ignoredWarnings.some(
			({ ignoredCode, ignoredPath }) =>
				warning.code === ignoredCode && warning.importer.includes(path.normalize(ignoredPath)),
		)
	) {
		rollupWarn(warning)
	}
}

export default {
	input: 'src/index.ts',
	onwarn,
	output: [ // @todo - re-enable later
		// {
		// 	dir: 'dist',
		// 	format: 'esm',
		// 	strict: true,
		// 	sourcemap: true,
		// },
		{
			dir: 'dist',
			format: 'cjs',
			strict: true,
			sourcemap: true,
		},
	],
	plugins: [
		typescript({
			noEmit: false,
		}),
		filesize({ theme: 'light' })
	],
}
