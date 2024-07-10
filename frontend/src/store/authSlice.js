import { createSlice } from '@reduxjs/toolkit'

// Retrieve user from localStorage
const userString = localStorage.getItem('user')

// Check if userString is not undefined or null before parsing
const user = userString ? JSON.parse(userString) : null
const initialState = {
	user: user,
	isAuthenticated: false,
	isLoading: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			if (action.payload.success) {
				state.isAuthenticated = true
				state.user = action.payload.user

				localStorage.setItem('user', JSON.stringify(action.payload.user))
			}
		},
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		logout: (state, action) => {
			state.isAuthenticated = false
			state.user = []
			localStorage.removeItem('user')
		},
		autoLogin: (state, action) => {
			if (action.payload?.success) {
				state.isAuthenticated = true
				state.user = [...action.payload.user]
			} else {
				state.isAuthenticated = false
				state.user = []
				localStorage.removeItem('user')
			}
		}
	}
})

export const authActions = authSlice.actions
// export const classAction = classSlice.actions

export default authSlice.reducer
