import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes, FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, toggleTask } from '../Actions/taskActions'

function TaskTable({ tasks, clickedRowHandler }) {
	const { searchKey } = useSelector(state => state.task)
	const dispatch = useDispatch()

	const deleteHandler = id => {
		dispatch(deleteTask(id))
	}

	const checkHandler = task => {
		dispatch(toggleTask(task))
	}

	// Filter tasks based on searchKey
	const filteredTasks = tasks?.filter(task =>
		task.title.toLowerCase().includes(searchKey?.toLowerCase())
	)

	return (
		<Table responsive>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Description</th>
					<th>DueDate</th>
					<th>Completed</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{searchKey !== ''
					? filteredTasks?.map((task, index) => (
							<tr key={task._id}>
								<td>{index + 1}</td>
								<td>{task.title}</td>
								<td>{task.description}</td>
								<td>{task.dueDate}</td>
								<td>{task.completed ? 'Completed' : 'Not Yet'}</td>
								<td>
									{!task.completed ? (
										<FaCheck
											className="p-1 text-primary"
											size={25}
											style={{ cursor: 'pointer' }}
											onClick={() => checkHandler(task)}
										/>
									) : (
										<FaTimes
											className="p-1 text-danger"
											size={25}
											style={{ cursor: 'pointer' }}
											onClick={() => checkHandler(task)}
										/>
									)}

									<FaEye
										className="p-1 text-warning"
										size={25}
										style={{ cursor: 'pointer' }}
										onClick={() => clickedRowHandler(task)}
									/>

									<Link className="p-1 text-success" to={`/task/${task._id}`}>
										<FaPen />
									</Link>

									<FaTrash
										onClick={() => deleteHandler(task._id)}
										size={25}
										className="p-1 text-danger"
										style={{ cursor: 'pointer' }}
									/>
								</td>
							</tr>
					  ))
					: tasks?.map((task, index) => (
							<tr key={task._id}>
								<td>{index + 1}</td>
								<td>{task.title}</td>
								<td>{task.description}</td>
								<td>{task.dueDate}</td>
								<td>{task.completed ? 'Completed' : 'Not Yet'}</td>
								<td>
									{!task.completed ? (
										<FaCheck
											className="p-1 text-primary"
											size={25}
											style={{ cursor: 'pointer' }}
											onClick={() => checkHandler(task)}
										/>
									) : (
										<FaTimes
											className="p-1 text-danger"
											size={25}
											style={{ cursor: 'pointer' }}
											onClick={() => checkHandler(task)}
										/>
									)}

									<FaEye
										className="p-1 text-warning"
										size={25}
										style={{ cursor: 'pointer' }}
										onClick={() => clickedRowHandler(task)}
									/>

									<Link className="p-1 text-success" to={`/task/${task._id}`}>
										<FaPen />
									</Link>

									<FaTrash
										onClick={() => deleteHandler(task._id)}
										size={25}
										className="p-1 text-danger"
										style={{ cursor: 'pointer' }}
									/>
								</td>
							</tr>
					  ))}
			</tbody>
		</Table>
	)
}

export default TaskTable
