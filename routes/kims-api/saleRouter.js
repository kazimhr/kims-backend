var express = require('express');
var router = express.Router();
var { Sale } = require('../../models/salesModal');
const validateSale = require('../../middleware/validateSale');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {
	const invent = await Sale.find();
	res.send(invent);
});

router.get('/salescount', async (req, res) => {
	const invent = await Sale.find().count();
	if (!invent) return res.status(400).send('Not found');
	const inventString = String(invent);
	res.send(inventString);
});

router.get('/salesdue', async (req, res) => {
	const invent = await Sale.find({ credit_due: { $gte: 1000 } });
	if (!invent) return res.status(400).send('Not found');
	res.send(invent);
});

router.get('/:id', async (req, res) => {
	const invent = await Sale.findOne({ salesman_id: req.params.id });
	if (!invent) return res.status(400).send('Not found');
	res.send(invent);
});

router.post('/post', validateSale, async (req, res) => {
	const postInventory = new Sale({
		salesman_id: req.body.salesman_id,
		salesman_name: req.body.salesman_name,
		salesman_contact: req.body.salesman_contact,
		credit_due: req.body.credit_due
	});

	await postInventory.save();
	return res.send(postInventory);
});

router.put('/substract/:id', async (req, res) => {
	const updated = await Sale.findOne({ salesman_id: req.params.id }, function(err, user) {
		user.credit_due = user.credit_due - req.body.creditReleased;
		user.save(function(err) {
			if (err) {
				console.error('ERROR!');
			}
		});
	});
	res.send(updated);
});

router.put('/credit/:id', async (req, res) => {
	const updated = await Sale.findOne({ salesman_id: req.params.id }, function(err, user) {
		user.credit_due = user.credit_due + req.body.total;
		user.save(function(err) {
			if (err) {
				console.error('ERROR!');
			}
		});
	});
	res.send(updated);
});

router.put('/:id', async (req, res) => {
	const updated = await Sale.findOne({ salesman_id: req.params.id }, function(err, user) {
		user.salesman_id = req.body.salesman_id;
		user.salesman_name = req.body.salesman_name;
		user.salesman_contact = req.body.salesman_contact;
		user.credit_due = req.body.credit_due;
		user.save(function(err) {
			if (err) {
				console.error('ERROR!');
			}
		});
	});

	res.send(updated);
});

// delete using custom id

router.delete('/:id', async (req, res) => {
	const del = await Sale.deleteOne({ salesman_id: req.params.id }, function(err) {
		if (err) console.log(err);
		console.log('Successful deletion');
	});

	res.send(del);
});

module.exports = router;
