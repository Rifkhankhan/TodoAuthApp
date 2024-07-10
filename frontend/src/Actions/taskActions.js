import * as taskApi from '../Apis/taskApi'
import { taskActions } from '../store/taskSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showToastError = (message, autoClose = 2000) => {
	toast.error(message, { autoClose })
}

export const getErrorMessages = errorMessage => {
	return {
		400: `Oops! Something went wrong: ${errorMessage}`,
		401: `Unauthorized: ${errorMessage}`,
		403: `Forbidden: ${errorMessage}`,
		404: `You don't have an account: ${errorMessage}`,
		409: `Oops! You have no access: ${errorMessage}`,
		408: `Request Timeout: ${errorMessage}`,
		429: `Too Many Requests: ${errorMessage}`,
		500: `Internal Server Error: ${errorMessage}`,
		502: `Bad Gateway: ${errorMessage}`,
		503: `Service Unavailable: ${errorMessage}`,
		504: `Gateway Timeout: ${errorMessage}`
	}
}

export const createTask = formData => async dispatch => {
	dispatch(taskActions.handleLoading())
	try {
		const { data } = await taskApi.createTask(formData)

		if (data.success) {
			dispatch(taskActions.createTask(data.tasks))
			toast.success('Completed Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.code === 'ERR_NETWORK') {
			showToastError('Network Error: Please check your internet connection.')
			return
		}
		const status = error.response?.status
		const errorMessage = error.response?.data?.message || 'Something went wrong'

		const errorMessages = getErrorMessages(errorMessage)

		showToastError(errorMessages[status] || `Error: ${errorMessage}`)
	}
	dispatch(taskActions.handleLoading())
}

export const getTasks = () => async dispatch => {
	dispatch(taskActions.handleLoading())
	try {
		const { data } = await taskApi.getTasks()

		if (data.success) {
			dispatch(taskActions.createTask(data.tasks))
		}
	} catch (error) {
		if (error.code === 'ERR_NETWORK') {
			showToastError('Network Error: Please check your internet connection.')
			return
		}
		const status = error.response?.status
		const errorMessage = error.response?.data?.message || 'Something went wrong'

		const errorMessages = getErrorMessages(errorMessage)

		showToastError(errorMessages[status] || `Error: ${errorMessage}`)
	}
	dispatch(taskActions.handleLoading())
}

export const updateTask =
	({ id, formData }) =>
	async dispatch => {
		dispatch(taskActions.handleLoading())

		try {
			const { data } = await taskApi.updateTask(id, formData)

			if (data.success) {
				dispatch(taskActions.updateTask(data.tasks))
				toast.success('Updated Successfully!', {
					autoClose: 2000
				})
			}
		} catch (error) {
			if (error.code === 'ERR_NETWORK') {
				showToastError('Network Error: Please check your internet connection.')
				return
			}
			const status = error.response?.status
			const errorMessage =
				error.response?.data?.message || 'Something went wrong'

			const errorMessages = getErrorMessages(errorMessage)

			showToastError(errorMessages[status] || `Error: ${errorMessage}`)
		}
		dispatch(taskActions.handleLoading())
	}

export const toggleTask = task => async dispatch => {
	dispatch(taskActions.handleLoading())

	try {
		const { data } = await taskApi.toggleTask(task._id)

		if (data.success) {
			dispatch(taskActions.toggleTask(task))
			toast.success(
				`${task.completed ? 'Unchecked' : 'Checked'} successfully`,
				{
					autoClose: 2000
				}
			)
		}
	} catch (error) {
		if (error.code === 'ERR_NETWORK') {
			showToastError('Network Error: Please check your internet connection.')
			return
		}
		const status = error.response?.status
		const errorMessage = error.response?.data?.message || 'Something went wrong'

		const errorMessages = getErrorMessages(errorMessage)

		showToastError(errorMessages[status] || `Error: ${errorMessage}`)
	}
	dispatch(taskActions.handleLoading())
}
export const deleteTask = id => async dispatch => {
	dispatch(taskActions.handleLoading())
	try {
		const { data } = await taskApi.deleteTask(id)
		if (data.success) {
			dispatch(taskActions.deleteTask(id))
			toast.success('Deleted Successfully!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.code === 'ERR_NETWORK') {
			showToastError('Network Error: Please check your internet connection.')
			return
		}
		const status = error.response?.status
		const errorMessage = error.response?.data?.message || 'Something went wrong'

		const errorMessages = getErrorMessages(errorMessage)

		showToastError(errorMessages[status] || `Error: ${errorMessage}`)
	}
	dispatch(taskActions.handleLoading())
}
