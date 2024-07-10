import { authActions } from '../store/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as AuthApi from '../Apis/authApi'
import { getErrorMessages, showToastError } from './taskActions'

export const logIn = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.logIn(formData)

		if (data.success) {
			toast.success('LoggedIn Successfully!', {
				autoClose: 2000
			})
			dispatch(authActions.login(data))
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
	dispatch(authActions.handleLoading())
}

export const logout = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.logout()

		if (data.success) {
			dispatch(authActions.logout())
			toast.success('LoggedOut Successfully!', {
				autoClose: 2000
			})
			window.location.reload()
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
	dispatch(authActions.handleLoading())
}

export const autoLogin = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.autoLogin()

		dispatch(authActions.autoLogin(data))
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

	dispatch(authActions.handleLoading())
}

export const registerUser = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.register(formData)
		if (data.success) {
			toast.success('SignedUp Successfully!', {
				autoClose: 2000
			})
			dispatch(authActions.login(data))
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
	dispatch(authActions.handleLoading())
}
