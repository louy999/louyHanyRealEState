import db from '../database/index'
import ReplayTypes from '../types/replay.types'

class ReplayModel {
	//create replay
	async createReplay(u: ReplayTypes): Promise<ReplayTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO replay ( user_id, request_id, replay ) values ($1, $2, $3) returning *'
			//run query
			const result = await connect.query(sql, [u.user_id, u.request_id, u.replay])
			//release connect
			connect.release()
			//return created replay

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all replay
	async getAllReplays(): Promise<ReplayTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from replay'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created replay
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific replay
	async getOneReplay(id: string): Promise<ReplayTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from replay WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created replay
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find replay ${id}, ${err}`)
		}
	}
	async getOneFromUserId(user_id: string): Promise<ReplayTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from replay WHERE request_id=($1)'
			//run query
			const result = await connect.query(sql, [user_id])
			//release connect
			connect.release()
			//return created replay
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find replay ${user_id}, ${err}`)
		}
	}
	async getOneFromRequestId(request_id: string): Promise<ReplayTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from replay WHERE request_id=($1)'
			//run query
			const result = await connect.query(sql, [request_id])
			//release connect
			connect.release()
			//return created replay
			return result.rows
		} catch (err) {
			throw new Error(`.could not find replay ${request_id}, ${err}`)
		}
	}
	//update replay

	async update(u: ReplayTypes): Promise<ReplayTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE replay SET replay=$1 WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.replay, u.id])
			//release connect
			connect.release()
			//return created replay, name=$4, image_profile=$5
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  replay ${u.id}, ${err}`)
		}
	}

	async delete(id: string): Promise<ReplayTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from replay  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created replay
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  replay ${id}, ${err}`)
		}
	}
}
export default ReplayModel
