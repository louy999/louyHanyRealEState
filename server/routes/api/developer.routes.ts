import {Router, Request, Response} from 'express'
import config from '../../config'
import DeveloperModel from '../../models/developer.model'
const developerModel = new DeveloperModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.createDeveloper(req.body)
		res.json({
			status: 'success',
			data: {...developer},
			message: 'developer created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.getAllDevelopers()
		res.json({
			status: 'success',
			data: developer,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.getOneDeveloper(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: developer,
			message: 'developer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/name/:name', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.getOneFromName(
			req.params.name as unknown as string
		)
		res.json({
			status: 'success',
			data: developer,
			message: 'developer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.update(req.body)
		res.json({
			status: 'success',
			data: developer,
			message: 'developer updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const developer = await developerModel.delete(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: developer,
			message: 'developer deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
