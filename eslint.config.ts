import tseslint from 'typescript-eslint'

export default tseslint.config(tseslint.configs.recommended, {
	files: ['**/*.ts', '**/*.tsx'],
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			project: './tsconfig.json', // Para que entienda el contexto
			tsconfigRootDir: import.meta.dirname, // Evita tu error anterior
		},
	},
})
