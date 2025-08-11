import './config/envLoader.js'
import express, { Request, Response, NextFunction } from 'express'
import routes from './src/infrastructure/api/routes/index.js'
import SendResponse from './src/infrastructure/api/utils/responseHelper.js'
import AuthenticationMiddleware from './src/infrastructure/api/middlewares/authenticationMiddleware.js'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.get('/api', (req, res) => {
	res.status(200).json({ message: 'You API is running successfully' })
})

app.use('/api', AuthenticationMiddleware, routes)

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof SyntaxError && 'body' in err) {
		return SendResponse({
			res,
			method: 'ERROR',
			message: 'El JSON consultado tiene errores de sintaxis',
			data: null,
		})
	}
	next(err)
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack)
	return SendResponse({
		res,
		method: 'ERROR',
		message: 'Se ha producido un error interno',
		data: null,
	})
})

app.listen(port, () => {
	console.log(`You API are running in http://127.0.0.1:${port}/api`)
})
