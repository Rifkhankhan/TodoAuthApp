const bcrypt = require('bcryptjs')

exports.users = [
	{
		name: 'Rifkhan',
		email: 'rifkhanmuhammed17@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Masiya',
		email: 'fathimamasiya@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},

	{
		name: 'Daniya',
		email: 'daniya@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'john_doe',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'jane_doe',
		email: 'jane@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'alice_smith',
		email: 'alice@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'bob_jones',
		email: 'bob@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	},
	{
		name: 'charlie_brown',
		email: 'charlie@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false
	}
]
