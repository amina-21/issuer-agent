const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProofSchema = new Schema({
  attributes: String,
  schema_name: String,
  schema_version: String,
});

const Proof = mongoose.model("ProofSchema", ProofSchema);

module.exports = Proof;
