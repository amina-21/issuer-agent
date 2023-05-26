const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  connection_id: String,
  invitation: String,
  recipientKeys: String,
  serviceEndpoint: String,
  invitation_url: String,
});

const Invitation = mongoose.model("Invitation", InvitationSchema);

module.exports = Invitation;
