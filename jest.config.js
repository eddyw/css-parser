const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
	roots: ['<rootDir>/src'],
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper({
		'~/*': ['src/*'],
	}),
	globals: {
		'ts-jest': {
			tsConfig: './tsconfig.test.json',
		},
	},
}
