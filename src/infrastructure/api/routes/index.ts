import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const removeExtension = (file: string) => {
	return file.split('.').shift()
}

const files = fs.readdirSync(__dirname)

const setupRoutes = async () => {
	for (const file of files) {
		if (!file.endsWith('.js')) continue

		const name = removeExtension(file)
		if (name !== 'index') {
			const module = await import(`./${file}`)
			router.use(`/${name}`, module.default)
		}
	}
}

await setupRoutes()

export default router
