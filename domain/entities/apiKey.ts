export default class ApiKey {
  constructor(
    public id: number,
    public hash: string,
    public createdAt: Date,
    public expireAt: Date,
    public isActive: boolean,
  ) {
    this.id = id
    this.hash = hash
    this.createdAt = createdAt
    this.expireAt = expireAt
    this.isActive = isActive
  }
}
