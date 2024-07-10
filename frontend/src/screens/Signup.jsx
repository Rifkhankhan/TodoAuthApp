import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import logo from './../images/todo.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn, registerUser } from './../Actions/AuthAction'
import LoadingSpinner from '../component/Loading'
import {
	Button,
	FormControl,
	FormGroup,
	Row,
	Form,
	Container
} from 'react-bootstrap'

const Signup = () => {
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	const [formValid, setFormValid] = useState(true)
	const navigate = useNavigate()
	const { user } = useSelector(state => state.auth)

	const isLoading = useSelector(state => state.auth.isLoading)

	const initialInputsState = {
		email: { value: '', isValid: true },
		name: { value: '', isValid: true },
		password: { value: '', isValid: true }
	}
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		if (formSubmit) {
			if (user) {
				navigate('/')
			}
		}
	}, [user, formSubmit])

	useEffect(() => {
		setFormValid(
			inputs.email.isValid && inputs.password.isValid && inputs.name.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}
	const submitHandler = e => {
		e.preventDefault()
		const data = {
			name: inputs.name.value,
			email: inputs.email.value,
			password: inputs.password.value
		}

		const emailValid =
			data.email?.trim().length && data.email.trim().includes('@')
		const passwordValid = data.password?.trim().length >= 6
		const nameValid = data.name?.trim().length >= 3

		if (!emailValid || !passwordValid || !nameValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					email: { value: currentInputs.email.value, isValid: emailValid },
					name: { value: currentInputs.name.value, isValid: nameValid },
					password: {
						value: currentInputs.password.value,
						isValid: passwordValid
					}
				}
			})
			return
		}

		dispatch(registerUser(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}

	return (
		<Container fluid className={`${styles.container}`}>
			<div className={styles.form}>
				<div className="row text-center text-light p-2">
					<h3>Sign Up </h3>
				</div>
				<div className="row">
					<img src={logo} alt="" />
				</div>
				{!formValid && (
					<div className="row ">
						<p
							className="text-warning text-capitalize  "
							style={{ fontSize: '2vh' }}>
							Invalid Data Please check!
						</p>
					</div>
				)}
				<Form className="row" onSubmit={submitHandler}>
					<FormGroup
						class="form-group col-md-10 col-10 my-2"
						style={{ marginInline: 'auto' }}>
						<FormControl
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Name"
							value={inputs.name.value}
							onChange={e => inputTextChangeHandler('name', e.target.value)}
						/>
					</FormGroup>
					<FormGroup
						class="form-group col-md-10 col-10 my-2"
						style={{ marginInline: 'auto' }}>
						<FormControl
							disabled={isLoading}
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							placeholder="Email"
							value={inputs.email.value}
							onChange={e => inputTextChangeHandler('email', e.target.value)}
						/>
					</FormGroup>
					<FormGroup
						class="form-group col-md-10 col-10 my-1"
						style={{ marginInline: 'auto' }}>
						<FormControl
							disabled={isLoading}
							type="password"
							class="form-control"
							id="exampleInputEmail1"
							value={inputs.password.value}
							onChange={e => inputTextChangeHandler('password', e.target.value)}
							placeholder="Password"
						/>
					</FormGroup>
					<FormGroup
						class="form-group col-md-10 col-10 my-2 mb-3 "
						style={{ marginInline: 'auto' }}>
						<Button
							disabled={isLoading}
							type="submit"
							class="btn btn-primary"
							style={{ width: '100%' }}>
							{!isLoading ? 'Signup' : 'Loading...'}
						</Button>
					</FormGroup>
				</Form>
			</div>
		</Container>
	)
}

export default Signup
