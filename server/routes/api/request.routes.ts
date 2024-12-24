import {Router, Request, Response} from 'express'
import config from '../../config'
import RequestModel from '../../models/request.model'
const requestModel = new RequestModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.createRequest(req.body)
		res.json({
			status: 'success',
			data: {...request},
			message: 'request created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.getAllRequests()
		res.json({
			status: 'success',
			data: request,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.getOneRequest(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: request,
			message: 'request retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/user/:user', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.getOneFromUserId(
			req.params.user as unknown as string
		)
		res.json({
			status: 'success',
			data: request,
			message: 'request retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.update(req.body)
		res.json({
			status: 'success',
			data: request,
			message: 'request updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await requestModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: request,
			message: 'request deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
