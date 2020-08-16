var express = require('express');
var router = express.Router();
var { Invoice } = require('../../models/invoicesModel');
const validateInvoice = require('../../middleware/validateInvoices');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {
	const invent = await Invoice.find();
	res.send(invent);
});

//change
router.get('/detail/:id', async (req, res) => {
	const invent = await Invoice.findOne({ _id: req.params.id });
	if (!invent) return res.status(400).send('Not found');
	const refine = String(invent.product_details);
	console.log(refine);
	res.send(refine);
});

router.post('/post', async (req, res) => {
	const postInventory = new Invoice({
		salesman_id: req.body.salesman_id,
		product_details: req.body.product_details,
		total: req.body.total
	});

	await postInventory.save();
	return res.send(postInventory);
});

router.put('/:id', async (req, res) => {
	//update using mongodb generated id
	var prod = await Invoice.findById(req.params.id);
	prod.salesman_id = req.body.salesman_id;
	prod.product_details = req.body.product_details;
	prod.total = req.body.total;
	await prod.save();
	return res.send(prod);
});

router.delete('/:id', async (req, res) => {
	const del = await Invoice.deleteOne({ _id: req.params.id }, function(err) {
		if (err) console.log(err);
	});

	res.send(del);
});

module.exports = router;
