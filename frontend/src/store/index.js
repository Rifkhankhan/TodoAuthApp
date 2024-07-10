import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import taskSlice from './taskSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		task: taskSlice
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),

	devTools: true
})
