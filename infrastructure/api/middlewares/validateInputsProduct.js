const SendResponse = require('../utils/responseHelper')

const validateInputsProduct = (req, res, next) => {
	try {
		const { name, stock } = req.body

		if (!name || typeof name !== 'string') {
			return SendResponse(res, 'ERROR', "Parámetro 'name' incorrecto")
		}

		if (typeof stock !== 'number' || stock <= 0) {
			return SendResponse(res, 'ERROR', "Parámetro 'stock' incorrecto")
		}

		next()
	} catch (error) {
		return SendResponse(res, 'ERROR', error.message)
	}
}

module.exports = validateInputsProduct
