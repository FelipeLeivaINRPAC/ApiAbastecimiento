class UserServices {
	constructor(userRepository) {
		this.repository = userRepository
	}

	async getAll(id) {
		return await this.repository.getAll(id)
	}

	async getById(id) {
		return await this.repository.getById(id)
	}

	async create(name, lastname, email) {
		return await this.repository.create(name, lastname, email)
	}

	async update(id, name, lastname, email, isActive) {
		return await this.repository.update(id, name, lastname, email, isActive)
	}

	async delete(id) {
		return await this.repository.delete(id)
	}
}

module.exports = UserServices
