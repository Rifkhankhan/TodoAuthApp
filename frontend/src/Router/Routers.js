import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Header from './../component/Header/Header'
import LoadingSpinner from './../component/LoadingSpinner/LoadingSpinner'
import Home from './../screens/Home'
import Login from './../screens/Login'
import Signup from './../screens/Signup'
import CreateTask from '../screens/CreateTask'
import EditScreen from '../screens/EditScreen'
import { autoLogin } from '../Actions/AuthAction'

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
	return isAuthenticated ? (
		<Route {...rest} element={element} />
	) : (
		<Navigate to="/login" replace />
	)
}

const Routers = () => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const isLoading = useSelector(state => state.auth.isLoading)

	useEffect(() => {
		dispatch(autoLogin())
	}, [dispatch])

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<>
			<Header />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				{/* Public Routes */}
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />

				{/* Protected Routes */}
				<PrivateRoute
					path="/task/new"
					element={<CreateTask />}
					isAuthenticated={isAuthenticated}
				/>
				<PrivateRoute
					path="/task/:id"
					element={<EditScreen />}
					isAuthenticated={isAuthenticated}
				/>
			</Routes>
		</>
	)
}

export default Routers
