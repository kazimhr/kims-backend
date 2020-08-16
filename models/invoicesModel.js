const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const productDetailSchema = new mongoose.Schema({
	product_id: { type: Number, required: true },
	qnty: { type: Number, required: true }
});

const invoicesSchema = mongoose.Schema({
	salesman_id: Number,
	product_details: [ productDetailSchema ],
	total: Number
});

var Invoices = mongoose.model('Invoices', invoicesSchema);

function validateInvoice(data) {
	const schema = Joi.object({
		salesman_id: Joi.number().required().min(0),
		total: Joi.number().min(0).required()
	});

	return schema.validate(data, { abortEarly: false });
}

module.exports.Invoice = Invoices;
module.exports.validate = validateInvoice;
