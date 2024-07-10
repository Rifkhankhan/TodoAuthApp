import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TaskTable from './../component/TaskTable'
import { Link, useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './../component/Loading'
import { getTasks } from '../Actions/taskActions'
import Model from './../component/Modal/Modal'
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner'
const Home = () => {
	const { loading, tasks } = useSelector(state => state.task)
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState(null)

	useEffect(() => {}, [tasks])

	useEffect(() => {
		dispatch(getTasks())
	}, [dispatch])

	const clickedRowHandler = task => {
		setClickedRow(task)
		setShowModal(prev => !prev)
	}

	return (
		<Container style={{ minHeight: '100vh' }}>
			<Row>
				<Col className="me-auto my-3" sm={12} md={6} lg={4} xl={3}>
					<Link className="btn btn-primary" to="/task/new">
						Create Task
					</Link>
				</Col>
			</Row>
			{tasks.length > 0 && (
				<Row>
					<TaskTable tasks={tasks} clickedRowHandler={clickedRowHandler} />
				</Row>
			)}

			{tasks.length === 0 && (
				<Row>
					<p>There is no tasks</p>
				</Row>
			)}

			<Model
				showModal={showModal}
				setShowModal={setShowModal}
				task={clickedRow}
			/>
		</Container>
	)
}

export default Home
