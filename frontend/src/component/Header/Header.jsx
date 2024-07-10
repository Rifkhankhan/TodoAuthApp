import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
// import { useLogoutMutation } from '../../store/userApiSlice'
// import { logout } from './../../store/authSlice'
import SearchBox from '../SearchBox'
import { logout } from '../../Actions/AuthAction'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const location = useLocation()

	const logoutHandler = () => {
		try {
			if (user) {
				dispatch(logout())
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (!user) {
			navigate('/home')
		}
	}, [user])

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>Todo</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{location.pathname === ('/' || '/home') && <SearchBox />}

							{user ? (
								<NavDropdown title={user?.name} id="username">
									<LinkContainer to="/">
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<>
									<LinkContainer to="/login">
										<Nav.Link className="text-light">
											<FaUser /> Login
										</Nav.Link>
									</LinkContainer>

									<LinkContainer to="/signup">
										<Nav.Link className="text-light">
											<FaSignInAlt /> Signup
										</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
