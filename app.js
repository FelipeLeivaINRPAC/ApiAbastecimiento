const express = require('express')
const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'You API is running successfully' })
})
app.use('/api', require('./infrastructure/api/routes/'))

app.listen(port, () => {
  console.log(`You API are running in http://127.0.0.1:${port}/api`)
})
