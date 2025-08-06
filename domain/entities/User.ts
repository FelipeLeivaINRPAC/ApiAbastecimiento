import IUser from '../interfaces/IUser.js'

export default class User {
  id: number
  rut: number
  dv: string
  name: string
  lastname: string
  email: string
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date

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
  }: IUser) {
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
