const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

// Load URL model
const URL = require("../../models/urls.js");

// @route GET /api/shorten/test
// @desc Test API endpoint
router.get("/test", (req, res) => res.json({ msg: "API is working!" }));

// @route POST /api/shorten
// @desc POST a UTL to shorten
router.post("/", (req, res) => {
	console.log(req.body);
	if (req.body.url) {
		urlData = req.body.url;
	}
	console.log("URL is: ", urlData);
	// Check if the URL already exists
	URL.findOne({ url: urlData }, (err, doc) => {
		if (doc) {
			console.log("Entry found in db.");
		} else {
			console.log("This is a new URL");
			const webaddress = new URL({
				_id: uniqid(),
				url: urlData
			});
			webaddress.save(err => {
				if (err) {
					return console.error(err);
				}
				res.send({
					url: urlData,
					hash: webaddress._id,
					status: 200,
					statusTxt: "OK"
				});
			});
		}
	});
});

module.exports = router;
