import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000'
			: 'http://65.2.161.115:5000',
	withCredentials: true // Include credentials (cookies)
})

export const logIn = formData => API.post('/user/login', formData)
export const register = formData => API.post('/user/register', formData)
export const logout = () => API.post(`/user/logout`)
export const autoLogin = () => API.post(`/user/autoLogin`)
