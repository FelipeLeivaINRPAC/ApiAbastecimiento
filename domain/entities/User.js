class User {
  constructor({
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
  }) {
    this.id = id
    this.rut = rut
    this.dv = dv
    this.name = name
    this.lastname = lastname
    this.email = email
    this.password = password
    this.isActive = isActive
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

module.exports = User
