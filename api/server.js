const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// added on 11/05/2023 in an attempt to simulate and make analogy referring to spencer's tuto of alice faber acme example
// this code calls out authentication module to verify whether the user is authenticated or not and if they are it allows them to send an invitation request
// ####################################
const app = express.Router();
const indy = require("../indy-e/index");
const auth = require("../client/src/components/authentication");
// ##########################################

// create an express application
//onst app = express();
// Add this line to handle JSON-encoded request bodies
app.use(bodyParser.json());

// allows us to use content type of application json inside our api
app.use(express.json());
app.use(express.urlencoded());
// stop any cross-origin errors
app.use(cors());

// npm i -D nodemon => it allows us to run a server

mongoose
  .connect("mongodb://localhost:27017/mern-agent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

const User = require("./models/User");

//routes register & login

// register endpoint
app.post("/register", async (req, res) => {
  const { username, userRole, password } = req.body;
  //The code above is telling bcrypt to hash the password received
  //from request body 10 times or 10 salt rounds
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      username,
      userRole,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//login endpoint
app.post("/login", async (req, res) => {
  // Retrieve username and password from request body
  const { username, password } = req.body;

  try {
    // Find user in database by username
    const user = await User.findOne({ username });

    // If user is not found, return error
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token with user ID and user role
    const token = jwt.sign(
      { id: user._id, role: user.userRole },
      "your_secret_key_here"
    );

    // Send token and user role in response
    res.json({ token, role: user.userRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
//#############################
// start of attempt of the 11/05/2023 to simulate the spencer demo alice faber acme
// so in case it wrecked the code just delete it and go back into running aca-py locally
// it did not take time for e super to refuse this and tell me to focus on ONE THING AT A TIIIIIME
//##################################

// send connection request endpoint
app.post(
  "/send_connection_request",
  auth.isLoggedIn,
  async function (req, res) {
    let theirEndpointDid = req.body.did;
    let connectionRequest = await indy.connections.prepareRequest(
      theirEndpointDid
    );

    await indy.crypto.sendAnonCryptedMessage(
      theirEndpointDid,
      connectionRequest
    );
    res.redirect("/#relationships");
  }
);

// create schema endpoint
app.post("/issuer/create_schema", auth.isLoggedIn, async function (req, res) {
  await indy.issuer.createSchema(
    req.body.name_of_schema,
    req.body.version,
    req.body.attributes
  );
  res.redirect("/#issuing");
});

// create credential definition schema
app.post("/issuer/create_cred_def", auth.isLoggedIn, async function (req, res) {
  await indy.issuer.createCredDef(req.body.schema_id, req.body.tag);
  res.redirect("/#issuing");
});

// send credential offer endpoint
app.post(
  "/issuer/send_credential_offer",
  auth.isLoggedIn,
  async function (req, res) {
    await indy.credentials.sendOffer(
      req.body.their_relationship_did,
      req.body.cred_def_id
    );
    res.redirect("/#issuing");
  }
);

// accept offer endpoint
app.post(
  "/credentials/accept_offer",
  auth.isLoggedIn,
  async function (req, res) {
    let message = indy.store.messages.getMessage(req.body.messageId);
    indy.store.messages.deleteMessage(req.body.messageId);
    await indy.credentials.sendRequest(
      message.message.origin,
      message.message.message
    );
    res.redirect("/#messages");
  }
);

// reject offer endpoint
app.post(
  "/credentials/reject_offer",
  auth.isLoggedIn,
  async function (req, res) {
    indy.store.messages.deleteMessage(req.body.messageId);
    res.redirect("/");
  }
);

//request connection endpoint
app.put("/connections/request", auth.isLoggedIn, async function (req, res) {
  let name = req.body.name;
  let messageId = req.body.messageId;
  let message = indy.store.messages.getMessage(messageId);
  indy.store.messages.deleteMessage(messageId);
  await indy.connections.acceptRequest(
    name,
    message.message.message.endpointDid,
    message.message.message.did,
    message.message.message.nonce
  );
  res.redirect("/#relationships");
});

//delete connection request endpoint
app.delete("/connections/request", auth.isLoggedIn, async function (req, res) {
  // FIXME: Are we actually passing in the messageId yet?
  if (req.body.messageId) {
    indy.store.messages.deleteMessage(req.body.messageId);
  }
  res.redirect("/#relationships");
});

//delete message request endpoint
app.post("/messages/delete", auth.isLoggedIn, function (req, res) {
  indy.store.messages.deleteMessage(req.body.messageId);
  res.redirect("/#messages");
});

// accept proof endpoint
app.post("/proofs/accept", auth.isLoggedIn, async function (req, res) {
  await indy.proofs.acceptRequest(req.body.messageId);
  res.redirect("/#messages");
});

// send request endpoint
app.post("/proofs/send_request", auth.isLoggedIn, async function (req, res) {
  let myDid = await indy.pairwise.getMyDid(req.body.their_relationship_did);
  await indy.proofs.sendRequest(
    myDid,
    req.body.their_relationship_did,
    req.body.proof_request_id,
    req.body.manual_entry
  );
  res.redirect("/#proofs");
});

// validate proof endpoint
app.post("/proofs/validate", auth.isLoggedIn, async function (req, res) {
  try {
    let proof = req.body;
    if (await indy.proofs.validate(proof)) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(500).send();
  }
});

//#############################
// the frontend actions are comming from an index file that has form action  C:\Users\a.kchaou1\Desktop\PFE\tuto\MERN-app-agents\ui-e\views\index.html
// end of attempt of the 11/05/2023 to simulate the spencer demo alice faber acme
//##################################

app.listen(3007, () => console.log("server running on 3007"));
