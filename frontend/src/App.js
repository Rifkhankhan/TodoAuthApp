import './App.css'
import { ToastContainer } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner'
import Header from './component/Header/Header'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTasks } from './Actions/taskActions'
import { autoLogin } from './Actions/AuthAction'

function App() {
	const dispatch = useDispatch()
	const { loading } = useSelector(state => state.task)
	const { isLoading, user } = useSelector(state => state.auth)

	useEffect(() => {
		if (user) {
			dispatch(autoLogin())
			dispatch(getTasks())
		}
	}, [])
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			{(loading || isLoading) && <LoadingSpinner />}
			<ToastContainer />
		</>
	)
}

export default App
