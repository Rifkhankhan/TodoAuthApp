import React, { useEffect } from 'react'
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
// import { useLogoutMutation } from '../../store/userApiSlice'
// import { logout } from './../../store/authSlice'
import SearchBox from '../SearchBox'
import { logout } from '../../Actions/AuthAction'
const Header = () => {
	// Retrieve user from localStorage
	const userString = localStorage.getItem('user')

	// Check if userString is not undefined or null before parsing
	const user = userString ? JSON.parse(userString) : null

	const dispatch = useDispatch()
	const logoutHandler = () => {
		try {
			dispatch(logout())
		} catch (error) {
			console.log(error)
		}
	}

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
							<SearchBox />

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
