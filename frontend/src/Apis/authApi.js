import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'todo-auth-f9p89r51j-rifkhankhans-projects.vercel.app',
	withCredentials: true // Include credentials (cookies)
})

export const logIn = formData => API.post('/user/login', formData)
export const register = formData => API.post('/user/register', formData)
export const logout = () => API.post(`/user/logout`)
export const autoLogin = () => API.post(`/user/autoLogin`)
