import db from '../database/index'
import RequestTypes from '../types/request.types'

class RequestModel {
	//create Request
	async createRequest(u: RequestTypes): Promise<RequestTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO Request ( user_id, request ) values ($1, $2) returning *'
			//run query
			const result = await connect.query(sql, [u.user_id, u.request])
			//release connect
			connect.release()
			//return created Request

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all Request
	async getAllRequests(): Promise<RequestTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from Request'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created Request
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific Request
	async getOneRequest(id: string): Promise<RequestTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from Request WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Request
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Request ${id}, ${err}`)
		}
	}
	async getOneFromUserId(user_id: string): Promise<RequestTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from Request WHERE user_id=($1)'
			//run query
			const result = await connect.query(sql, [user_id])
			//release connect
			connect.release()
			//return created Request
			return result.rows
		} catch (err) {
			throw new Error(`.could not find Request ${user_id}, ${err}`)
		}
	}
	//update Request

	async update(u: RequestTypes): Promise<RequestTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE Request SET  request=$1 WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.request, u.id])
			//release connect
			connect.release()
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  Request ${u.id}, ${err}`)
		}
	}

	async delete(id: string): Promise<RequestTypes> {
		try {
			// Open connect with DB
			const connect = await db.connect()

			// Delete associated replays first
			const deleteReplaysSql = 'DELETE FROM Replay WHERE request_id = $1'
			await connect.query(deleteReplaysSql, [id])

			// Then delete the request
			const deleteRequestSql = 'DELETE FROM Request WHERE id = $1 RETURNING *'
			const result = await connect.query(deleteRequestSql, [id])

			// Release connect
			connect.release()

			// Return deleted Request
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete Request ${id}, ${err}`)
		}
	}
}
export default RequestModel
