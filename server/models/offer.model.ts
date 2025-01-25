import db from '../database/index'
import OfferTypes from '../types/offer.types'

class OfferModel {
	//create Offer
	async createOffer(u: OfferTypes): Promise<OfferTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO offer ( developer_id, image_offer, furniture, down_payment, types, location, installment, areas, bed, bath, status, cat, title, unit_type, developer_name ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 ) returning *'
			//run query
			const result = await connect.query(sql, [
				u.developer_id,
				u.image_offer,
				u.furniture,
				u.down_payment,
				u.types,
				u.location,
				u.installment,
				u.areas,
				u.bed,
				u.bath,
				u.status === '' ? true : u.status,
				u.cat,
				u.title,
				u.unit_type,
				u.developer_name,
			])
			//release connect
			connect.release()
			//return created Offer

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all offer
	async getAllOffers(): Promise<OfferTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from offer'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created Offer
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	async getAllOffersUint(): Promise<OfferTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT unit_type  from offer'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created Offer
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific Offer
	async getOneOffer(id: string): Promise<OfferTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offer WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Offer ${id}, ${err}`)
		}
	}
	async getOfferByType(types: string): Promise<OfferTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offer WHERE types=($1)'
			//run query
			const result = await connect.query(sql, [types])
			//release connect
			connect.release()
			//return created Offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Offer ${types}, ${err}`)
		}
	}
	async getOneFromDeveloperId(developer_id: string): Promise<OfferTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from offer WHERE developer_id=($1)'
			//run query
			const result = await connect.query(sql, [developer_id])
			//release connect
			connect.release()
			//return created Offer
			return result.rows
		} catch (err) {
			throw new Error(`.could not find Offer ${developer_id}, ${err}`)
		}
	}
	//update Offer

	async update(u: OfferTypes): Promise<OfferTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE offer SET developer_id=$1, image_offer=$2, furniture=$3, down_payment=$4, types=$5, location=$6, installment=$7, areas=$8  WHERE id=$9 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.developer_id,
				u.image_offer,
				u.furniture,
				u.down_payment,
				u.types,
				u.location,
				u.installment,
				u.areas,
				u.id,
			])
			//release connect
			connect.release()
			//return created Offer, name=$4, image_profile=$5
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  Offer ${u.id}, ${err}`)
		}
	}

	async delete(id: string): Promise<OfferTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from offer  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Offer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  Offer ${id}, ${err}`)
		}
	}
}
export default OfferModel
