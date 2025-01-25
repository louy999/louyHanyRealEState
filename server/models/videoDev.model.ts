import db from '../database/index'
import VideoDev from '../types/videoDev.types'

class VideoDevModel {
	//create VideoDev
	async createVideoDev(u: VideoDev): Promise<VideoDev> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO video_dev ( developer_id, title_video, video ) values ($1, $2, $3) returning *'
			//run query
			const result = await connect.query(sql, [
				u.developer_id,
				u.title_video,
				u.video,
			])
			//release connect
			connect.release()
			//return created VideoDev

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all video_dev
	async getAllVideoDev(): Promise<VideoDev[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from video_dev'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created VideoDev
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific VideoDev
	async getOneVideoDev(id: string): Promise<VideoDev> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from video_dev WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created VideoDev
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find VideoDev ${id}, ${err}`)
		}
	}
	async getOneFromDevId(developer_id: string): Promise<VideoDev[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from video_dev WHERE developer_id=($1)'
			//run query
			const result = await connect.query(sql, [developer_id])
			//release connect
			connect.release()
			//return created VideoDev
			return result.rows
		} catch (err) {
			throw new Error(`.could not find VideoDev ${developer_id}, ${err}`)
		}
	}
	//update VideoDev

	async update(u: VideoDev): Promise<VideoDev> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE video_dev SET developer_id=$1, title_video=$2, video=$3 WHERE id=$4 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.developer_id,
				u.title_video,
				u.video,
				u.id,
			])
			//release connect
			connect.release()
			//return created VideoDev, name=$4, image_profile=$5
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  VideoDev ${u.title_video}, ${err}`)
		}
	}

	async delete(id: string): Promise<VideoDev> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from video_dev  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created VideoDev
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  VideoDev ${id}, ${err}`)
		}
	}
}
export default VideoDevModel
