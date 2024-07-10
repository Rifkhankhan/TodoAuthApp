import './App.css'
import { ToastContainer } from 'react-toastify'

import { BrowserRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import Routers from './Router/Routers'
import { store } from './store'
import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Routers />
				<ToastContainer />
			</div>
		</Provider>
	)
}

export default App
