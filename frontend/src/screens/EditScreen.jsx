import React, { useCallback, useEffect, useState } from 'react'

import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../component/LoadingSpinner/LoadingSpinner'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTask, getTasks } from '../Actions/taskActions'
import FormContainer from '../component/FormContainer'

const EditScreen = () => {
	const [formValid, setFormValid] = useState(true)
	const [formSubmit, setFormSubmit] = useState(false)
	const navigate = useNavigate()
	const currentUser = useSelector(state => state.auth.user)
	const { tasks } = useSelector(state => state.task)
	const dispatch = useDispatch()
	const { id } = useParams()

	const { isLoading } = useSelector(state => state.task)

	const task = tasks?.find(task => task._id === id)

	useEffect(() => {
		dispatch(getTasks())
	}, [dispatch])

	let initialInputsState = {
		title: { value: task?.title, isValid: true },
		dueDate: { value: task?.dueDate, isValid: true },
		description: { value: task?.description, isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)
	useEffect(() => {
		if (task) {
			setInputs({
				title: { value: task.title, isValid: true },
				dueDate: { value: task.dueDate, isValid: true },
				description: { value: task.description, isValid: true }
			})
		} else {
			navigate('/')
		}
	}, [task])
	const inputTextChangeHandler = (inputType, enteredValue) => {
		if (inputType === 'dueDate') {
			const selectedDate = enteredValue
			const currentTime = new Date().toLocaleTimeString('en-US', {
				hour12: false
			})
			const selectedDateTime = `${selectedDate} ${currentTime}`

			enteredValue = selectedDateTime
		}

		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	useEffect(() => {
		setFormValid(
			inputs.title.isValid &&
				inputs.dueDate.isValid &&
				inputs.description.isValid
		)
	}, [inputs])

	const submitHandler = e => {
		e.preventDefault()

		const data = {
			title: inputs.title.value,
			description: inputs.description.value,
			dueDate: inputs.dueDate.value
		}

		const titleValid = data.title?.trim().length > 0
		const descriptionValid = data.description?.trim().length > 0
		const dueDateValid = data.dueDate?.trim().length > 0

		if (!titleValid || !descriptionValid || !dueDateValid) {
			setInputs(currentInputs => {
				return {
					description: {
						value: currentInputs.description.value,
						isValid: descriptionValid
					},
					dueDate: {
						value: currentInputs.dueDate.value,
						isValid: dueDateValid
					},

					title: {
						value: currentInputs.title.value,
						isValid: titleValid
					}
				}
			})
			return
		}

		dispatch(updateTask({ id, formData: data }))

		setFormSubmit(true)
		setInputs(initialInputsState)

		navigate('/')
	}
	return (
		<Container>
			<FormContainer>
				<h3>Edit Task</h3>
				{isLoading && <LoadingSpinner />}
				<>
					{!formValid && (
						<div className="row ">
							<p
								className="text-warning text-capitalize  "
								style={{ fontSize: '2vh' }}>
								Invalid Data Please check!
							</p>
						</div>
					)}
					{task && (
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="name" className="mt-2">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Product Title"
									required
									value={inputs.title.value}
									onChange={e =>
										inputTextChangeHandler('title', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="price" className="mt-2">
								<Form.Label>Due Date</Form.Label>
								<Form.Control
									type="date"
									placeholder="Enter Due Date"
									required
									value={inputs.dueDate.value}
									onChange={e =>
										inputTextChangeHandler('dueDate', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="Brand" className="mt-2">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									type="textarea"
									placeholder="Enter Product Brand"
									required
									row
									multiple
									value={inputs.description.value}
									onChange={e =>
										inputTextChangeHandler('description', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="description" className="mt-2">
								<Button variant="success" type="submit">
									Update Task
								</Button>
							</Form.Group>
						</Form>
					)}
				</>
			</FormContainer>
		</Container>
	)
}

export default EditScreen
