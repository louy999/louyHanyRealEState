type User = {
	id?: string
	date?: string
	name: string
	email: string
	phone: string | number
	password: string
	access: boolean | string
	image_profile: string
}

export default User
