const uuid = require("uuid");
const bcrypt = require('bcrypt');


const database = require("../config").promise();



module.exports.registerUser = async(req, res) => {
  try {console.log(req.body)
    const {fullName, username, email, password} = req.body
    console.log(uuid.v4())
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, saltRounds);


    console.log(hashedPass)
  const INSERT_USER = `INSERT INTO users (userId, fullname, username, email, password) VALUES(${database.escape(
      uuid.v4()
        )},${database.escape(
          fullName
        )}, ${database.escape(username)}, ${database.escape(
          email
        )}, ${database.escape(hashedPass)});
            `;
  const [INFO] = await database.execute(INSERT_USER);

  res.send("server berjalan")}
  catch (err) {
    console.log("error : ", err)}
}

module.exports.loginUser = async(req, res) => {
  try { 
    const {username, password } = req.body
    console.log(username, password)
    const CHECK_USER = `SELECT * FROM users WHERE username = ?;`;
    const [USER] = await database.execute(CHECK_USER, [username]);
    if (!USER.length) {
      throw new Error("user is not registered.");
    }

    const valid = await bcrypt.compare(password, USER[0].password);
    console.log("is valid : ", valid);
    if (!valid) {
      throw new Error("invalid password!");
    }

  }
  catch (err) {
    console.log("error : ", err)}
  
}
