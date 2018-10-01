const jwt = require("jsonwebtoken");

function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.secretOrPublicKey = secretOrPublicKey;
  this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function(payload, signOptions, cb) {
  const jwtSignOptions = Object.assign({}, signOptions, this.options);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions, cb);
};

module.exports = TokenGenerator;
