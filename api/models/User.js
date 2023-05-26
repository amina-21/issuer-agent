const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  userRole: String,
  password: String,
  DID: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
