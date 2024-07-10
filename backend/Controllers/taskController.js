const asyncHandler = require('../Middleware/asyncHandler')
const Task = require('../Models/TaskModel')

exports.getTasks = asyncHandler(async (req, res, next) => {
	try {
		const tasks = await Task.find({ user: req.user._id })

		res.status(200).json({
			success: true,
			tasks: tasks
		})
	} catch (error) {
		res.status(404).json({ success: false })

		throw new Error('Task are not found')
	}
})

exports.getTask = asyncHandler(async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id)

		res.status(200).json(task)
	} catch (error) {
		res.status(404)
		throw new Error('Task are not found')
	}
})

exports.createTask = asyncHandler(async (req, res, next) => {
	try {
		const task = await Task.create({
			user: req.user._id,
			title: req.body.title || 'sample product',
			description: req.body.description || 'sample description',
			dueDate: req.body.dueDate || new Date()
		})

		// No need to call save() again because Task.create() already saves the document

		const tasks = await Task.find({ user: req.user._id })

		console.log(tasks)

		res.status(200).json({ success: true, tasks: tasks })
	} catch (error) {
		console.error('Error creating task:', error.message) // Log the error for debugging purposes
		res.status(500).json({ success: false, message: 'Failed to create task' })
	}
})

exports.updateTask = asyncHandler(async (req, res) => {
	const { title, description, dueDate } = req.body

	try {
		const task = await Task.findById(req.params.id)

		if (!task) {
			return res.status(404).json({ success: false, message: 'Task not found' })
		}

		task.title = title || task.title
		task.description = description || task.description
		task.dueDate = dueDate || task.dueDate
		task.user = req.user._id // Assuming the user needs to be updated as well

		await task.save()

		const tasks = await Task.find({ user: req.user._id })

		console.log(tasks)

		res.status(200).json({ success: true, tasks: tasks })
	} catch (error) {
		console.error('Error updating task:', error.message) // Log the error for debugging purposes
		res.status(500).json({ success: false, message: 'Failed to update task' })
	}
})

exports.deleteTask = asyncHandler(async (req, res, next) => {
	const task = await Task.findById(req.params.id)

	if (task) {
		await Task.deleteOne({ _id: task._id })

		res.status(200).json({ success: true, message: 'deleted Successfully!' })
	} else {
		res.status(404).json({ success: false, message: 'problem with deleting!' })
	}
})

exports.toggleTask = asyncHandler(async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)

		if (!task) {
			return res.status(404).json({ success: false, message: 'Task not found' })
		}

		task.completed = !task.completed

		await task.save()

		const tasks = await Task.find({ user: req.user._id })

		res.status(200).json({ success: true, tasks: tasks })
	} catch (error) {
		console.error('Error updating task:', error.message) // Log the error for debugging purposes
		res.status(500).json({ success: false, message: 'Failed to toggle task' })
	}
})
