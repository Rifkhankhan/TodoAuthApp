import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { autoLogin } from '../../Actions/AuthAction'

const PrivateRoute = () => {
	const dispatch = useDispatch()

	let user = JSON.parse(localStorage.getItem('user'))

	useEffect(() => {
		user = JSON.parse(localStorage.getItem('user'))

		dispatch(autoLogin())
	}, [user])

	return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
