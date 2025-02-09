import axios from 'axios'

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
	withCredentials: true // Include credentials (cookies)
})

// export const getUser = (userId) => API.get(`user/${userId}`);

export const createUser = formData => API.post('/user', formData)
export const getUser = id => API.get(`/user/${id}`)
export const deleteUser = id => API.delete(`/user/${id}`)
export const getUsers = () => API.get('/user')
export const getUserActivities = () => API.get('/user/activities')
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)
export const resetPassword = id => API.put(`/user/reset/${id}`)
export const updatePassword = (id, formData) =>
	API.put(`/user/updatePassword/${id}`, formData)
export const activateToggle = id => API.put(`/user/activate/${id}`)
