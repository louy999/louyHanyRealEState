import db from '../database/index'
import DeveloperTypes from '../types/developer.types'

class DeveloperModel {
	//create Developer
	async createDeveloper(u: DeveloperTypes): Promise<DeveloperTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO developer ( name, image_developer, location ) values ($1, $2, $3) returning *'
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.image_developer,
				u.location,
			])
			//release connect
			connect.release()
			//return created Developer

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all developer
	async getAllDevelopers(): Promise<DeveloperTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from developer'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created Developer
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific Developer
	async getOneDeveloper(id: string): Promise<DeveloperTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from developer WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Developer ${id}, ${err}`)
		}
	}
	async getOneFromName(name: string): Promise<DeveloperTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from developer WHERE name=($1)'
			//run query
			const result = await connect.query(sql, [name])
			//release connect
			connect.release()
			//return created Developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find Developer ${name}, ${err}`)
		}
	}
	//update Developer

	async update(u: DeveloperTypes): Promise<DeveloperTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE developer SET name=$1, image_developer=$2, location=$3 WHERE id=$4 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.image_developer,
				u.location,
				u.id,
			])
			//release connect
			connect.release()
			//return created Developer, name=$4, image_profile=$5
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  Developer ${u.name}, ${err}`)
		}
	}

	async delete(id: string): Promise<DeveloperTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from developer  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created Developer
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  Developer ${id}, ${err}`)
		}
	}
}
export default DeveloperModel
