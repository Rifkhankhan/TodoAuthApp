const dotenv = require('dotenv')
const User = require('./Models/UserModel')
const Task = require('./Models/TaskModel')
const { users } = require('./data/users')
const { tasks } = require('./data/tasks')

const { connectDB } = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Task.deleteMany()
		await User.deleteMany()

		const createUsers = await User.insertMany(users)
		const adminUser = createUsers[0]._id

		const sampleTask = tasks.map(task => {
			return { ...task, user: adminUser }
		})

		await Task.insertMany(sampleTask)

		console.log('Data Imported')
		process.exit()
	} catch (error) {
		console.log(`Error ${error}`)
		process.exit(1)
	}
}
const destroyData = async () => {
	try {
		await Task.deleteMany()
		await User.deleteMany()

		console.log('Data Destroyed')
		process.exit()
	} catch (error) {
		console.log(`Error ${error}`)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
