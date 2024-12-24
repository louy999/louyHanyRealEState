import {Router, Request, Response} from 'express'
import config from '../../config'
import OfferModel from '../../models/offer.model'
const offerModel = new OfferModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.createOffer(req.body)
		res.json({
			status: 'success',
			data: {...offer},
			message: 'offer created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.getAllOffers()
		res.json({
			status: 'success',
			data: offer,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.getOneOffer(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/name/:name', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.getOneFromDeveloperId(
			req.params.name as unknown as string
		)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.update(req.body)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const offer = await offerModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: offer,
			message: 'offer deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
