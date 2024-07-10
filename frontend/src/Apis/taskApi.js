import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000'
			: 'http://65.2.161.115:5000',
	withCredentials: true // Include credentials (cookies)
})

export const createTask = formData => API.post('/task', formData)
export const getTask = id => API.get(`/task/${id}`)
export const deleteTask = id => API.delete(`/task/${id}`)
export const getTasks = () => API.get('/task')
export const updateTask = (id, formData) => API.put(`/task/${id}`, formData)
export const toggleTask = id => API.put(`/task/toggle/${id}`)
