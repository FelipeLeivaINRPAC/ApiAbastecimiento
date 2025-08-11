import IProductRepository from '../../../domain/repositories/IProductRepository.js'

export default class GetProductById {
	constructor(private repository: IProductRepository) {
		this.repository = repository
	}

	async execute(id: number) {
		return await this.repository.getById(id)
	}
}
