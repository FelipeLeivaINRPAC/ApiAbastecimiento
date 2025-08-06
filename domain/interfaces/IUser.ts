export default interface IUser {
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
}
