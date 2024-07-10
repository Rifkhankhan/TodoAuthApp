const express = require('express')
const {
	registerUser,
	logoutUser,
	authUser,
	getUserProfile,
	updateUserProfile,
	autoLogin
} = require('../Controllers/userController')

const { protect, admin } = require('./../Middleware/authMiddlewate')

const router = express.Router()

router.post('/logout', protect, logoutUser)
router.post('/login', authUser)
router.post('/register', registerUser)
router.post('/autoLogin', autoLogin)

// router
// 	.route('/admin/:id')
// 	.get(protect, admin, getUser)
// 	.put(protect, admin, updateUser)
// 	.delete(protect, admin, deleteUser)

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

module.exports = router
