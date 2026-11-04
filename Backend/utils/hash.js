const crypto = require("crypto");

module.exports = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");