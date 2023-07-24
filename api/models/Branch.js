const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  holderDID: String,
  branchName: String,
  branchManager: String,
  location: String,
  legitimizedFromIssuer: String,
  acceptedFromHolder: String,
  longitude: String,
  latitude: String,
  invited: String,
  defaultCredGen: String,
});

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = Branch;
