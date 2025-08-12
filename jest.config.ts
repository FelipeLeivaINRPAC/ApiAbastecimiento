export default {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { useESM: true }],
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	extensionsToTreatAsEsm: ['.ts'],
	testMatch: ['**/__tests__/**/*.test.(ts|js)'],
}
