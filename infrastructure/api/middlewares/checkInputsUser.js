const SendResponse = require('../utils/responseHelper')

const checkInputsUser = (req, res, next) => {
  try {
    switch (req.method) {
      case 'DELETE':
      case 'GET':
      case 'PUT':
        if (!req.params.id) {
          return SendResponse(res, 'ERROR', "Parámetro 'id' incorrecto")
        }
        break

      case 'POST': {
        const { rut, name, lastname, email } = req.body

        if (!rut || typeof rut !== 'number') {
          return SendResponse(res, 'ERROR', "Parámetro 'rut' incorrecto")
        }

        if (!name || typeof name !== 'string') {
          return SendResponse(res, 'ERROR', "Parámetro 'name' incorrecto")
        }

        if (!lastname || typeof lastname !== 'string') {
          return SendResponse(res, 'ERROR', "Parámetro 'lastname' incorrecto")
        }

        if (!email || typeof email !== 'string') {
          return SendResponse(res, 'ERROR', "Parámetro 'email' incorrecto")
        }

        break
      }
    }

    next()
  } catch (error) {
    return SendResponse(res, 'ERROR', error.message)
  }
}

module.exports = checkInputsUser
