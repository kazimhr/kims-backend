var express = require('express');
var router = express.Router();
var { UserLog } = require('../models/userModel');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
	let user = await UserLog.findOne({ email: req.body.email });
	if (user) return res.status(400).send('Email already registered.');
	user = new UserLog({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	await user.generateHashedPassword();

	await user.save();
	return res.send(_.pick(user, [ 'name', 'email' ]));
});

router.post('/login', async (req, res) => {
	let user = await UserLog.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid Email');
	let isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(401).send('Incorrect Password');
	const token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, config.get('jwtPrivateKey'));

	return res.send(token);
});

module.exports = router;
