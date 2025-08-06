import IUserRepository from '../repositories/IUserRepository.js'
import User from '../entities/User.js'

export default class UserServices {
  repository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.repository = userRepository
  }

  async getAll() {
    return await this.repository.getAll()
  }

  async getById(id: number) {
    return await this.repository.getById(id)
  }

  async create(
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
  ) {
    return await this.repository.create(rut, dv, name, lastname, email)
  }

  async update(
    id: number,
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    isActive: boolean,
  ) {
    return await this.repository.update(
      id,
      rut,
      dv,
      name,
      lastname,
      email,
      password,
      isActive,
    )
  }

  async delete(id: number) {
    return await this.repository.delete(id)
  }
}
