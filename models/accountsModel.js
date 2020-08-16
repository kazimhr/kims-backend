const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const accountsSchema = mongoose.Schema({
	flow: String,
	amount: Number,
	date: { type: Date, default: Date.now }
});

var Account = mongoose.model('Accounts', accountsSchema);

function validateAccount(data) {
	const schema = Joi.object({
		flow: Joi.string().required(),
		amount: Joi.number().required().min(0)
	});

	return schema.validate(data, { abortEarly: false });
}

module.exports.Account = Account;
module.exports.validate = validateAccount;
