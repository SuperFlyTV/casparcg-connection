module.exports = {
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
				diagnostics: { ignoreCodes: [151002] },
			},
		],
	},
	testMatch: ['**/__tests__/**/*.spec.(ts|js)'],
	testPathIgnorePatterns: ['integrationTests'],
	testEnvironment: 'node',
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
	coverageDirectory: './coverage/',
	collectCoverage: true,
}
