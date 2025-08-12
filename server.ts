import './config/envLoader.js'
import app from './app.js'

const port = process.env.PORT ?? 3000
const server = app.listen(port, () => {
	console.log(`You API is running in http://127.0.0.1:${port}/api`)
})

export default server
