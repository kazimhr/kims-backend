const { validate } = require('../models/accountsModel');

function validateAccount(req, res, next) {
	console.log(req.body);
	let { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	next();
}

module.exports = validateAccount;
