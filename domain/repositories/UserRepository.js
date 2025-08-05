class UserRepository {
  getById(id) {
    throw new Error('Método no implementado')
  }

  getAll() {
    throw new Error('Método no implementado')
  }

  create(rut, dv, name, lastname, email, createdAt, updatedAt) {
    throw new Error('Método no implementado')
  }

  update(
    id,
    rut,
    dv,
    name,
    lastname,
    email,
    password,
    isActive,
    createdAt,
    updatedAt,
  ) {
    throw new Error('Método no implementado')
  }

  delete(id) {
    throw new Error('Método no implementado')
  }
}

module.exports = UserRepository
