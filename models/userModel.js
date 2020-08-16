const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var bcrypt = require('bcryptjs');

const userLoginModel = mongoose.Schema({
	name: {
		type: String,
		uppercase: true
	},
	email: String,
	password: String,
	role: {
		type: String,
		default: 'user'
	}
});

userLoginModel.methods.generateHashedPassword = async function() {
	let salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
};

var UserLogin = mongoose.model('User', userLoginModel);

function validateUserSignin(data) {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});
	return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});

	return schema.validate(data, { abortEarly: false });
}

module.exports.UserLog = UserLogin;
module.exports.validateUserSign = validateUserSignin;
module.exports.validateUserLog = validateUserLogin;
