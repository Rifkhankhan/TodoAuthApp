var mongoose = require('mongoose')
mongoose.Promise = global.Promise

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		dueDate: {
			type: String,
			required: true
		},
		completed: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true // Automatically adds createdAt and updatedAt fields
	}
)

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema)
