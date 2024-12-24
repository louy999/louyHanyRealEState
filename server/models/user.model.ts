import db from '../database/index'
import User from '../types/user.types'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as unknown as string, 10)
	return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
	//create user
	async createUser(u: User): Promise<User> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const sql =
				'INSERT INTO users ( name, phone, password, access, email, image_profile ) values ($1, $2, $3, $4, $5, $6) returning *'
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				hashPassword(u.password),
				u.access,
				u.email,
				u.image_profile === '' ? 'blank-profile-.png' : u.image_profile,
			])
			//release connect
			connect.release()
			//return created user

			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all users
	async getAllUsers(): Promise<User[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT id, date, name, phone, access, email, image_profile  from users'
			//run query
			const result = await connect.query(sql)
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific user
	async getOneUser(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT id, date, name, phone, access, email, image_profile from users WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	async getOneFromEmail(email: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT id, date, name, phone, access, email, image_profile from users WHERE email=($1)'
			//run query
			const result = await connect.query(sql, [email])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${email}, ${err}`)
		}
	}
	//update user

	async update(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET name=$1, phone=$2, access=$3, email=$4, image_profile=$5 WHERE id=$6 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.name,
				u.phone,
				u.access,
				u.email,
				u.image_profile,
				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}

	async delete(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from users  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  user ${id}, ${err}`)
		}
	}
	//authenticate user
	async auth(phone: string | number, password: string): Promise<User | null> {
		try {
			const connect = await db.connect()
			const sql = `SELECT password FROM users WHERE phone=$1`
			const res = await connect.query(sql, [phone])
			if (res.rows.length) {
				const {password: hashPassword} = res.rows[0]
				const isPassValid = bcrypt.compareSync(
					`${password}${config.pepper}`,
					hashPassword
				)
				if (isPassValid) {
					const userInfo = await connect.query(
						`SELECT id, date, name, phone, access, email, image_profile FROM users WHERE phone=($1)`,
						[phone]
					)
					return userInfo.rows[0]
				} else {
					throw new Error(`password not match`)
				}
			} else {
				throw new Error(`not found this number`)
			}
			connect.release()
			return null
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
}
export default UserModel
