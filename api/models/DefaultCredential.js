const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultCredentialSchema = new Schema({
  username: String,
  password: String,
});

const defaultCredential = mongoose.model(
  "defaultCredential",
  defaultCredentialSchema
);

module.exports = defaultCredential;
