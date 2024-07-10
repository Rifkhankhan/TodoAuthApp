const asyncHandler = require('../Middleware/asyncHandler')
const UserModel = require('../Models/UserModel')
const generateToken = require('./../Utils/generateToken')
const jwt = require('jsonwebtoken')
exports.logoutUser = asyncHandler(async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	})

	res.status(200).json({ success: true, message: 'Logged out Succesfully' })
})

exports.authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	const user = await UserModel.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id)

		const data = {
			userId: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		}

		res.status(201).json({ success: true, user: data })
	} else {
		res
			.status(401)
			.json({ success: false, message: 'Invalid Email Or password' })
	}
})

exports.registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body

	const userExist = await UserModel.findOne({ email })

	if (userExist) {
		res.status(400)
		throw new Error('User already exist')
	}

	const user = await UserModel.create({
		name,
		email,
		password
	})

	if (user) {
		generateToken(res, user._id)

		const data = {
			userId: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		}

		res.status(201).json({ success: true, user: data })
	} else {
		res.status(401)
		throw new Error('Invalid Email Or password')
	}
})

exports.getUsers = asyncHandler(async (req, res, next) => {
	try {
		const users = await UserModel.find({})

		res.status(200).json(users)
	} catch (error) {
		res.status(404)
		throw new Error('users are not found')
	}
})

exports.getUserProfile = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)
		res.status(200).json({
			name: user.name,
			email: user.email
		})
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id)

	if (user) {
		generateToken(res, user._id)

		user.name = req.body.name
		user.email = req.body.email
		user.password = req.body.password

		const updateProfile = await user.save()

		res.status(200).json(updateProfile)
	} else {
		res.status(404)
		throw new Error('user is not found')
	}
})

exports.autoLogin = asyncHandler(async (req, res, next) => {
	const token = req.cookies.jwt

	if (!token) {
		return res
			.status(403)
			.json({ success: false, message: 'Token not provided' })
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const user = await UserModel.findById(decoded.userId)

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User doesn't exist" })
		}

		req.user = user
		const data = {
			userId: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		}

		res.status(200).json({ success: true, user: data })
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ success: false, message: 'Token Invalid' })
		}

		res
			.status(500)
			.json({ message: 'Something went wrong', error: error.message })
	}
})
