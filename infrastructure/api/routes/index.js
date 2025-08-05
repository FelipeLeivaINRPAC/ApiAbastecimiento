const express = require('express')
const fs = require('fs')
const router = express.Router()

const removeExtension = (file) => {
  return file.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
  const name = removeExtension(file)
  if (name !== 'index') {
    router.use(`/${name}`, require(`./${file}`))
  }
})

module.exports = router
