const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE KEY
const db = require("./config/keys").mongoURI;

// Connect to the mongoDB
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

// Routes
const shorten = require("./routes/api/shorten");
app.use("/api/shorten", shorten);

const redirect = require("./routes/api/redirect.js");
app.use("/api/redirect", redirect);

app.get("/:hash", (req, res) => {
	const id = req.params.hash;
	URL.findOne({ _id: id }, (err, doc) => {
		if (doc) {
			console.log(doc.url);
			res.redirect("http://" + doc.url);
		} else {
			// Redirect to home page
			res.redirect("/");
		}
	});
});

// Path to listen to
app.get("/", (req, res) => {
	res.send("Hello johnny");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
