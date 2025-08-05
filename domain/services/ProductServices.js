class ProductService {
	constructor(repository) {
		this.repository = repository
	}

	async getById(id) {
		return await this.repository.getById(id)
	}

	async getAll() {
		return await this.repository.getAll()
	}

	async create(name, stock) {
		return await this.repository.create(name, stock)
	}

	async update(id, name, stock) {
		return await this.repository.update(id, name, stock)
	}

	async delete(id) {
		return await this.repository.delete(id)
	}
}

module.exports = ProductService
