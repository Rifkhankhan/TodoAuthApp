import * as taskApi from '../Apis/taskApi'
import { taskActions } from '../store/taskSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
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
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
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
			if (error.response?.status === 400) {
				toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
					autoClose: 2000
				})
			} else if (error.response?.status === 404) {
				toast.error(
					`You don't have an Account: ${error.response.data.message}`,
					{
						autoClose: 2000
					}
				)
			} else if (error.response?.status === 409) {
				toast.error(
					`Oops! You have no access: ${error.response.data.message}`,
					{
						autoClose: 2000
					}
				)
			} else if (error.response?.status === 408) {
				toast.error(`Internal Server Error: ${error.response.data.message}`, {
					autoClose: 2000
				})
			} else if (error.response?.status === 500) {
				toast.error(`Internal Server Error: ${error.response.data.message}`, {
					autoClose: 2000
				})
			}
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
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
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
		} else {
			toast.error('Opps Something wrong!', {
				autoClose: 2000
			})
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`You don't have an Account: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 409) {
			toast.error(`Oops! You have no access: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error.response.data.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(taskActions.handleLoading())
}
