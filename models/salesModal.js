const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const saleSchema = mongoose.Schema({
	salesman_id: { type: Number, unique: true },
	salesman_name: String,
	salesman_contact: Number,
	credit_due: Number
});

var Sale = mongoose.model('Sale', saleSchema);

function validateSales(data) {
	const schema = Joi.object({
		salesman_id: Joi.number().required().min(0),
		salesman_name: Joi.string().required(),
		salesman_contact: Joi.number().required(),
		credit_due: Joi.number().min(0).required()
	});

	return schema.validate(data, { abortEarly: false });
}

module.exports.Sale = Sale;
module.exports.validate = validateSales;
