export default class User {
  constructor(
    public id: number,
    public rut: number,
    public dv: string,
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
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
