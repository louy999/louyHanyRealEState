import {Router, Request, Response} from 'express'
import config from '../../config'
import VideoDevModel from '../../models/videoDev.model'
const videoDevModel = new VideoDevModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.createVideoDev(req.body)
		res.json({
			status: 'success',
			data: {...video},
			message: 'video created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.getAllVideoDev()
		res.json({
			status: 'success',
			data: video,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.getOneVideoDev(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: video,
			message: 'video retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/dev/:developer_id', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.getOneFromDevId(
			req.params.developer_id as unknown as string
		)
		res.json({
			status: 'success',
			data: video,
			message: 'video retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.update(req.body)
		res.json({
			status: 'success',
			data: video,
			message: 'video updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const video = await videoDevModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: video,
			message: 'video deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
