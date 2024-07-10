const express = require('express')
const {
	getTasks,
	getTask,
	createTask,
	deleteTask,
	updateTask,
	toggleTask
} = require('../Controllers/taskController')
const { protect, admin } = require('../Middleware/authMiddlewate')

const router = express.Router()

router.get('/', protect, getTasks)
router.post('/', protect, createTask)
router.put('/:id', protect, updateTask)
router.put('/toggle/:id', protect, toggleTask)
router.get('/:id', protect, getTask)
router.delete('/:id', protect, deleteTask)

module.exports = router
