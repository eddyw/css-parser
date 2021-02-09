import * as path from 'path'
import { terser } from 'rollup-plugin-terser'
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
		/**
		 * We do this because the default one is so terrible
		 */
		if (warning.pluginCode && warning.pluginCode.startsWith('TS')) {
			const { loc } = warning

			if (loc) {
				const location = `${loc.file}:${loc.line}:${loc.column}`
				warning.message = `\n${warning.message}\n\n${location}`
			}
		}
		rollupWarn(warning)
	}
}

/**
 * @type {import('rollup').NormalizedInputOptions}
 */
const config = {
	input: 'src/index.ts',
	onwarn,
	output: [
		// @todo - re-enable later
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
			tsBuildInfoFile: './dist/tsconfig.tsbuildinfo',
		}),
		// terser({ ecma: 2020, module: true }),
		filesize({ theme: 'light' }),
	],
}
export default config
