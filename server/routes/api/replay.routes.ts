import {Router, Request, Response} from 'express'
import config from '../../config'
import ReplayModel from '../../models/replay.model'
const replayModel = new ReplayModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.createReplay(req.body)
		res.json({
			status: 'success',
			data: {...replay},
			message: 'replay created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.getAllReplays()
		res.json({
			status: 'success',
			data: replay,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.getOneReplay(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: replay,
			message: 'replay retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/user/:user', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.getOneFromUserId(
			req.params.user as unknown as string
		)
		res.json({
			status: 'success',
			data: replay,
			message: 'replay retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/req/:req', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.getOneFromRequestId(
			req.params.req as unknown as string
		)
		res.json({
			status: 'success',
			data: replay,
			message: 'replay retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.update(req.body)
		res.json({
			status: 'success',
			data: replay,
			message: 'replay updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const replay = await replayModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: replay,
			message: 'replay deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
