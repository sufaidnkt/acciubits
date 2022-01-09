const sql = require("./db.js");

// constructor
const User = function (userData) {
  this.firstname = userData.firstname;
  this.lastname = userData.lastname;
  this.email = userData.email;
  this.age = userData.age;
};

User.create = (newData, result) => {
  sql.query("INSERT INTO user SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData });
  });
};

User.findOne = (email, result) => {
  console.log("email: ", email);
  sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error123: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
