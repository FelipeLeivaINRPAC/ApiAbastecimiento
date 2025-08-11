import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	// Configuración para JS y TS
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		ignores: ['dist/**', 'node_modules/**'],
		languageOptions: {
			globals: globals.node,
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin, // Usar plugin TS
		},
		extends: [
			js.configs.recommended, // Reglas recomendadas para JS
			...tseslint.configs.recommended, // Reglas recomendadas para TS
		],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
		},
	},
])
