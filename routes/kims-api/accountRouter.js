var express = require('express');
var router = express.Router();
var { Account } = require('../../models/accountsModel');
const validateAccount = require('../../middleware/validateAccount');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {
	const invent = await Account.find();
	res.send(invent);
});

router.get('/inflow', async (req, res) => {
	var d = new Date();
	var n = d.getMonth() + 1;
	const posts = await Account.find({ flow: 'Inflow', date: { $gte: `2020-${n}-01`, $lte: `2020-${n}-31` } });
	res.send(posts);
});

router.get('/outflow', async (req, res) => {
	var d = new Date();
	var n = d.getMonth() + 1;
	const posts = await Account.find({ flow: 'Outflow', date: { $gte: `2020-${n}-01`, $lte: `2020-${n}-31` } });
	res.send(posts);
});

router.get('/:id', async (req, res) => {
	const invent = await Account.findOne({ _id: req.params.id });
	if (!invent) return res.status(400).send('Not found');
	res.send(invent);
});

router.post('/post', validateAccount, async (req, res) => {
	const postInventory = new Account({
		flow: req.body.flow,
		amount: req.body.amount
	});

	await postInventory.save();
	return res.send(postInventory);
});

router.put('/:id', auth, admin, validateAccount, async (req, res) => {
	//update using mongodb generated id

	var prod = await Account.findById(req.params.id);
	console.log(req.body.flow);
	prod.flow = req.body.flow;
	prod.amount = req.body.amount;
	await prod.save();
	return res.send(prod);
});

// delete using custom id

router.delete('/:id', auth, admin, async (req, res) => {
	const del = await Account.deleteOne({ _id: req.params.id }, function(err) {
		if (err) console.log(err);
	});

	res.send(del);
});

module.exports = router;
