import IProductRepository from '../../../domain/repositories/IProductRepository.js'

export default class DeleteProduct {
	constructor(private repository: IProductRepository) {
		this.repository = repository
	}

	async execute(id: number): Promise<boolean> {
		return await this.repository.delete(id)
	}
}
