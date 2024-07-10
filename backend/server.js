const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

dotenv.config()

// Import routes
const userRouter = require('./Router/userRouter')
const taskRouter = require('./Router/taskRouter')

const app = express()

// Middleware setup
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS configuration
const corsOptions = {
	origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '', // Set your frontend URL in production
	credentials: true, // Allow credentials (cookies)
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Connect to database
connectDB()

// Routes
app.use('/task', taskRouter)
app.use('/user', userRouter)

const port = process.env.PORT || 5000

// Deployment settings
if (process.env.NODE_ENV === 'production') {
	// Set static folder

	// for render
	// app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))

	// for vercel
	app.use(express.static(path.join(__dirname, 'frontend', 'build')))

	// Any route that is not an API will be redirected to index.html
	app.get('*', (req, res) =>
		res.sendFile(
			// for render
			// path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')

			// for vercel
			path.resolve(__dirname, 'frontend', 'build', 'index.html')
		)
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is Running!')
	})
}

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${port}`
	)
)
