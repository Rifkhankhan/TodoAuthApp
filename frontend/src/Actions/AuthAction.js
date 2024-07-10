import { authActions } from '../store/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as AuthApi from '../Apis/authApi'

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
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 401) {
			toast.error(
				`Invalid Email Or passwordt: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 404) {
			toast.error(
				`You don't have an Account: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 409) {
			toast.error(
				`Oops! You have no access: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(
				`Internal Server Error ${error.response?.status}: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		}
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
		}
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(
				`You don't have an Account: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 409) {
			toast.error(
				`Oops! You have no access: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		}
	}
	dispatch(authActions.handleLoading())
}

export const autoLogin = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.autoLogin()

		dispatch(authActions.autoLogin(data))
	} catch (error) {
		if (error.response?.status === 400) {
			toast.error(`Oops! Something Wrong: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 404) {
			toast.error(`Authentication Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 401) {
			console.log(error?.response?.data?.message)
		} else if (error.response?.status === 409) {
			toast.error(
				`Oops! You have no access: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			console.log(error?.response?.data?.message)
		} else if (error.response?.status === 405) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		}
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
		if (error.response?.status === 400) {
			toast.error(`User already exist`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 401) {
			toast.error(
				`Invalid Email Or passwordt: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 404) {
			toast.error(
				`You don't have an Account: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 409) {
			toast.error(
				`Oops! You have no access: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		} else if (error.response?.status === 408) {
			toast.error(`Internal Server Error: ${error?.response?.data?.message}`, {
				autoClose: 2000
			})
		} else if (error.response?.status === 500) {
			toast.error(
				`Internal Server Error ${error.response?.status}: ${error?.response?.data?.message}`,
				{
					autoClose: 2000
				}
			)
		}
	}
	dispatch(authActions.handleLoading())
}
