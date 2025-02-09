import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loading = () => {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				color: 'white',
				width: '100px',
				height: '100px',
				margin: 'auto',
				display: 'block'
			}}></Spinner>
	)
}

export default Loading
