import '../../../../config/envLoader.js'
import request from 'supertest'
import app from './../../../../app.js'

const apiKey = process.env.API_KEY ?? ''

describe('Test CRUD User', () => {
	let idAux: number

	it('Without the API_KEY. Should return 401 on GET /api/users', async () => {
		const res = await request(app).get('/api/users/')

		expect(res.statusCode).toBe(401)
	})

	it('Should return 200 and list the users on GET /api/users', async () => {
		const res = await request(app).get('/api/users/').set('x-api-key', apiKey)

		expect(res.statusCode).toBe(200)
		expect(Array.isArray(res.body.data)).toBe(true)
		expect(res.body.data.length).toBeGreaterThanOrEqual(0)
		expect(res.body.data[0]).toHaveProperty('id')
		expect(res.body.data[0]).toHaveProperty('rut')
		expect(res.body.data[0]).toHaveProperty('dv')
		expect(res.body.data[0]).toHaveProperty('name')
		expect(res.body.data[0]).toHaveProperty('lastname')
		expect(res.body.data[0]).toHaveProperty('email')
		expect(res.body.data[0]).toHaveProperty('isActive')
		expect(res.body.data[0]).toHaveProperty('createdAt')
		expect(res.body.data[0]).toHaveProperty('updatedAt')
	})

	it('Should return 201 and create a new user on POST /api/users', async () => {
		const newUser = {
			rut: 98765432,
			name: 'Testing Name',
			lastname: 'Testing Lastname',
			email: 'email_testing@gmail.com',
		}

		const res = await request(app)
			.post('/api/users/')
			.set('x-api-key', apiKey)
			.send(newUser)

		expect(res.statusCode).toBe(201)
		expect(res.body.data).toHaveProperty('id')
		expect(res.body.data).toHaveProperty('rut')
		expect(res.body.data).toHaveProperty('dv')
		expect(res.body.data).toHaveProperty('name')
		expect(res.body.data).toHaveProperty('lastname')
		expect(res.body.data).toHaveProperty('email')
		expect(res.body.data).toHaveProperty('isActive')
		expect(res.body.data).toHaveProperty('createdAt')
		expect(res.body.data).toHaveProperty('updatedAt')

		idAux = res.body.data.id
	})

	it('Should return 200 and update the testing user on PUT /api/users', async () => {
		const newData = {
			rut: 19040800,
		}

		const res = await request(app)
			.put(`/api/users/${idAux}`)
			.set('x-api-key', apiKey)
			.send(newData)

		expect(res.statusCode).toBe(200)
	})

	it('Should return 200 and delete the testing user on DELETE /api/users', async () => {
		const res = await request(app)
			.delete(`/api/users/${idAux}`)
			.set('x-api-key', apiKey)

		expect(res.statusCode).toBe(200)
	})
})
