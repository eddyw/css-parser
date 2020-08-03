const ts = require('typescript')
const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

/**
 * Silly way to load tsconfig*.json file ..
 * - `tsconfig.test.json` uses `extends` (to extends from `tsconfig.json`),
 * 		so require' it won't work 🤷‍♀️
 * - `tsconfig.json` is a json-like .. json (which can contain comments & trailing comma),
 * 		so JSON.parse or require won't work
 * - I want to forget this file exists, so that's why we read it in this way ⤵
 */
const TS_CONFIG_PATH = path.resolve(__dirname, 'tsconfig.test.json')
const JSON_SOURCE = ts.readJsonConfigFile(TS_CONFIG_PATH, ts.sys.readFile)
const theThing = ts.parseJsonSourceFileConfigFileContent(JSON_SOURCE, ts.sys, __dirname)

module.exports = {
	roots: ['<rootDir>'],
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(theThing.options.paths, { prefix: '<rootDir>' }),
	globals: {
		'ts-jest': {
			tsConfig: './tsconfig.test.json',
		},
	},
}
