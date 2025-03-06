import {Router, Request, Response} from 'express'
import config from '../../config'
import FormModel from '../../models/form.model'
const formModel = new FormModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const form = await formModel.createForm(req.body)
		res.json({
			status: 'success',
			data: {...form},
			message: 'form created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const form = await formModel.getAllForms()
		res.json({
			status: 'success',
			data: form,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const form = await formModel.getOneForm(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: form,
			message: 'form retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/number/:number', async (req: Request, res: Response, next) => {
	try {
		const form = await formModel.getOneFromNumber(
			req.params.number as unknown as string
		)
		res.json({
			status: 'success',
			data: form,
			message: 'form retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
