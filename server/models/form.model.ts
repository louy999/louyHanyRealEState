import db from '../database/index'
import FormTypes from '../types/form.types'

class FormModel {
	//create form
	async createForm(u: FormTypes): Promise<FormTypes> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO form ( name, number, des ) values ($1, $2, $3) returning *'
			//run query
			const result = await connect.query(sql, [u.name, u.number, u.des])
			//release connect
			connect.release()
			//return created form

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`name already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all form
	async getAllForms(): Promise<FormTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT *  from form'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created form
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific form
	async getOneForm(id: string): Promise<FormTypes> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from form WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created form
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find form ${id}, ${err}`)
		}
	}

	async getOneFromNumber(number: string): Promise<FormTypes[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from form WHERE number=($1)'
			//run query
			const result = await connect.query(sql, [number])
			//release connect
			connect.release()
			//return created form
			return result.rows
		} catch (err) {
			throw new Error(`.could not find form ${number}, ${err}`)
		}
	}
}
export default FormModel
