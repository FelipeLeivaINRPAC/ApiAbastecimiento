const CalculateDv = (rut) => {
  return new Promise((resolve, reject) => {
    const rutStr = rut.toString()

    if (rutStr.length < 7 || rutStr.length > 9) {
      return reject(new Error('RUT incorrecto'))
    }

    const reversedRut = rutStr.split('').reverse()
    const multiplicadores = [2, 3, 4, 5, 6, 7]
    let suma = 0

    for (let i = 0; i < reversedRut.length; i++) {
      const digito = parseInt(reversedRut[i], 10)
      const multiplicador = multiplicadores[i % multiplicadores.length]
      suma += digito * multiplicador
    }

    const resto = suma % 11
    const dv = 11 - resto

    if (dv === 11) return resolve('0')
    if (dv === 10) return resolve('K')
    return resolve(dv.toString())
  })
}

module.exports = CalculateDv
