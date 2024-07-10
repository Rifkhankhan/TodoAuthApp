import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
	name: 'task',
	initialState: {
		loading: false,

		tasks: []
	},
	reducers: {
		createTask: (state, action) => {
			state.tasks = [...action.payload]
		},
		getTasks: (state, action) => {
			state.tasks = [...action.payload]
		},
		handleLoading: state => {
			state.loading = !state.loading
		},

		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter(task => task._id !== action.payload)
		},
		updateTask: (state, action) => {
			const updatedTask = {
				id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.tasks.findIndex(
				task => task._id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedTasks = [
					...state.tasks.slice(0, index), // elements before the updated object
					updatedTask, // updated object
					...state.tasks.slice(index + 1) // elements after the updated object
				]
				state.tasks = updatedTasks
			}
		},
		toggleTask: (state, action) => {
			const updatedTask = {
				...action.payload,
				completed: !action.payload.completed
			}

			// Find the index of the object to update
			const index = state.tasks.findIndex(
				task => task._id === action.payload._id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedTasks = [
					...state.tasks.slice(0, index), // elements before the updated object
					updatedTask, // updated object
					...state.tasks.slice(index + 1) // elements after the updated object
				]
				state.tasks = updatedTasks
			}
		}
	}
})

export const taskActions = taskSlice.actions
// export const classAction = classSlice.actions

export default taskSlice.reducer
