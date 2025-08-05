const SendResponse = (res, action, message, data) => {
  switch (action) {
    case 'GET':
      return res.status(200).json({
        success: true,
        message: message ?? 'Consulta exitosa',
        data,
      })

    case 'POST':
      return res.status(201).json({
        success: true,
        message: message ?? 'Recurso creado exitosamente',
        data,
      })

    case 'PUT':
    case 'DELETE':
      return res.status(200).json({
        success: true,
        message: message ?? 'Operación realizada exitosamente',
        data,
      })

    case 'ERROR':
      return res.status(404).json({
        success: false,
        message: message ?? 'Ocurrió un error',
        data,
      })

    case 'BAD_REQUEST':
      return res.status(400).json({
        success: false,
        message: message ?? 'Solicitud incorrecta',
        data,
      })

    case 'SERVER_ERROR':
      return res.status(500).json({
        success: false,
        message: message ?? 'Error interno del servidor',
        data,
      })

    default:
      return res.status(500).json({
        success: false,
        message: 'Acción no reconocida',
        data: null,
      })
  }
}

module.exports = SendResponse
