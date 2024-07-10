import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

import reportWebVitals from './reportWebVitals'
import { store } from './store'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom'

import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import CreateTask from './screens/CreateTask'
import EditTask from './screens/EditScreen'

import PrivateRoute from './component/Routes/PrivateRoute'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<PrivateRoute />}>
				<Route index={true} path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />

				<Route path="/task/new" element={<CreateTask />} />
				<Route path="/task/:id" element={<EditTask />} />
				<Route path="*" element={<Home />} />
			</Route>
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Login />} />
		</Route>
	)
)
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
