var { UserLog } = require('../models/userModel');

function admin(req, res, next) {
	console.log(req.user);
	if (req.user.role != 'admin') return res.status(403).send('You are not allowed');
	next();
}

module.exports = admin;
