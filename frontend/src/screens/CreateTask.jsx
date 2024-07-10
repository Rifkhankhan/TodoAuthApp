import React, { useEffect, useState } from 'react'
import FormContainer from './../component/FormContainer'
import { toast } from 'react-toastify'
import { Alert, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../component/Loading'
import { createTask } from './../Actions/taskActions'
import { useNavigate, useNavigation } from 'react-router-dom'

const CreateTask = () => {
	const [formValid, setFormValid] = useState(true)
	const [formSubmit, setFormSubmit] = useState(false)
	const currentUser = useSelector(state => state.auth.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { isLoading } = useSelector(state => state.task)

	if (!isLoading && formSubmit) {
		navigate('/')
	}

	const initialInputsState = {
		title: { value: '', isValid: true },
		dueDate: { value: '', isValid: true },
		description: { value: '', isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	const inputTextChangeHandler = (inputType, enteredValue) => {
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

		dispatch(createTask(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}
	return (
		<FormContainer>
			<h3>Create Task</h3>
			{isLoading && <Loading />}
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
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name" className="mt-2">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Product Title"
							required
							value={inputs.title.value}
							onChange={e => inputTextChangeHandler('title', e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="price" className="mt-2">
						<Form.Label>Due Date</Form.Label>
						<Form.Control
							type="date"
							placeholder="Enter Due Date"
							required
							value={inputs.dueDate.value}
							onChange={e => inputTextChangeHandler('dueDate', e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="Brand" className="mt-2">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="description"
							required
							multiple
							rows={3}
							value={inputs.description.value}
							onChange={e =>
								inputTextChangeHandler('description', e.target.value)
							}
						/>
					</Form.Group>

					<Form.Group controlId="description" className="mt-2">
						<Button variant="success" type="submit">
							Create Task
						</Button>
					</Form.Group>
				</Form>
			</>
		</FormContainer>
	)
}

export default CreateTask
