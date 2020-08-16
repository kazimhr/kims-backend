const jwt = require('jsonwebtoken');
const config = require('config');
var { UserLog } = require('../models/userModel');

async function auth(req, res, next) {
	let token = req.header('x-auth-token');
	if (!token) return res.status(400).send('Token not provided.');
	try {
		let user = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = await UserLog.findById({ _id: user._id });
		// console.log(req.user);
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	next();
}

module.exports = auth;
