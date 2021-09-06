const bcrypt = require("bcryptjs");

function encrypt(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

function decrypt(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  encrypt,
  decrypt,
};
