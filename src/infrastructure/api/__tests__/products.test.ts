import '../../../../config/envLoader.js'
import request from 'supertest'
import app from '../../../../app.js'

const apiKey = process.env.API_KEY ?? ''

describe('Test CRUD Product', () => {
	let idAux: number

	it('Without the API_KEY. Should return 401 on GET /api/products', async () => {
		const res = await request(app).get('/api/products/')

		expect(res.statusCode).toBe(401)
	})

	it('Should return 200 and list the products on GET /api/products', async () => {
		const res = await request(app)
			.get('/api/products/')
			.set('x-api-key', apiKey)

		expect(res.statusCode).toBe(200)
		expect(Array.isArray(res.body.data)).toBe(true)
		expect(res.body.data.length).toBeGreaterThanOrEqual(0)
		expect(res.body.data[0]).toHaveProperty('id')
		expect(res.body.data[0]).toHaveProperty('name')
		expect(res.body.data[0]).toHaveProperty('stock')
	})

	it('Should return 201 and create a new user on POST /api/products', async () => {
		const newProduct = {
			name: 'Testing Name',
			stock: 100,
		}

		const res = await request(app)
			.post('/api/products/')
			.set('x-api-key', apiKey)
			.send(newProduct)

		expect(res.statusCode).toBe(201)
		expect(res.body.data).toHaveProperty('id')
		expect(res.body.data).toHaveProperty('name')
		expect(res.body.data).toHaveProperty('stock')

		idAux = res.body.data.id
	})

	it('Should return 200 and update the testing user on PUT /api/products', async () => {
		const newData = {
			stock: 300,
		}

		const res = await request(app)
			.put(`/api/products/${idAux}`)
			.set('x-api-key', apiKey)
			.send(newData)

		expect(res.statusCode).toBe(200)
	})

	it('Should return 200 and delete the testing user on DELETE /api/products', async () => {
		const res = await request(app)
			.delete(`/api/products/${idAux}`)
			.set('x-api-key', apiKey)

		expect(res.statusCode).toBe(200)
	})
})
