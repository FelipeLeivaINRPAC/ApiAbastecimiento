const SendResponse = require('../utils/responseHelper')

const validateInputsUser = (req, res, next) => {
	try {
		const { name, lastname, email } = req.body

		if (!name || typeof name !== 'string') {
			return SendResponse(res, 'ERROR', "Parámetro 'name' incorrecto")
		}

		if (!lastname || typeof lastname !== 'string') {
			return SendResponse(res, 'ERROR', "Parámetro 'lastname' incorrecto")
		}

		if (!email || typeof email !== 'string') {
			return SendResponse(res, 'ERROR', "Parámetro 'email' incorrecto")
		}

		next()
	} catch (error) {
		return SendResponse(res, 'ERROR', error.message)
	}
}

module.exports = validateInputsUser
