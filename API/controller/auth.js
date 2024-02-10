const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpsOnly: true, secure: true }).json(userDoc);

          }
        );
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("user not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports.getUserDataFromReq = (req) => {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) (console.log("not getting user", err));
        if(userData === Object){
          return resolve(userData);
        }
      });
    });
  } catch (error) {
    console.log("Error in token", error)
  }
};
