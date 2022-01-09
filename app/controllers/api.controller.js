const Model = require("../models/model.js");
const nodemailer = require('nodemailer');

const publishMessage = require('../src/emailWorker.js').publishMessage;


module.exports = {
	async newsLetter(req, res) {
		try {
			var multiparty = require('multiparty');
			var form = new multiparty.Form();
			var fs = require('fs');
			const path1 = require('path');
			const { parse } = require('fast-csv');
			let rows = [];
			form.parse(req, function (err, fields, files) {
				console.log("fields: ", fields);
				console.log("files: ", files.file[0].path);
				pathe = files.file[0].path
				var file = files.file[0];
				var path = file.path;
				fs.createReadStream(path1.resolve(__dirname, path))
					.pipe(parse({ headers: true }))
					.on('error', error => console.error(error))
					.on('data', row => {
						console.log("ROW===", row);
						const emailOptions = {
							mail: row?.Email,
							subject: row["Newsletter Name"],
							template: row["Newsletter Content"]
						}
						console.log("Email options===", emailOptions);
						publishMessage(emailOptions);
						//each row can be written to db
						// rows.push(row);
					})
					.on('end', rowCount => {
						console.log(`Parsed ${rowCount} rows`);
						return res.status(200).send({
							message: 'Email sent successfully'
						})
					});
			});
		} catch (error) {
			console.log(error);
			res.status(500).send({
				message: "Could not upload the file: " + req.file.originalname,
			});
		}

	},
	async register(req, res) {
		try {
			// Create a User
			const tutorial = new Model({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				age: req.body.age,
			});
			// Save Tutorial in the database
			Model.create(tutorial, (err, data) => {
				if (err)
					res.status(500).send({
						message:
							err.message || "Some error occurred while creating the User."
					});
				else res.send(data);
			});
		}
		catch (error) {
			console.log(error);
			res.status(500).send({
				message: "Could not register the user",
			});
		}
	},
}

