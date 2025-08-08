import User from '../entities/user.js'

export default interface IUserRepository {
  getAll(): Promise<User[]>
  getById(id: number): Promise<User | null>
  create(
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
  ): Promise<User | null>
  update(
    id: number,
    rut: number,
    dv: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    isActive: boolean,
  ): Promise<User | null>
  delete(id: number): Promise<boolean>
}
