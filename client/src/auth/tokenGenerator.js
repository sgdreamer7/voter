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

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function(token, refreshOptions) {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        const payload = jwt.decode(token, { complete: true }).payload;
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti;
        // The first signing converted all needed options into claims, they are already in the payload
        resolve(jwt.sign(payload, this.secretOrPrivateKey, this.options));
      }
    }
  });
};

module.exports = TokenGenerator;
