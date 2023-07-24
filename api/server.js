const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const session = require("express-session");
const crypto = require("crypto");

// create an express application
const app = express();
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

// Generate a random secret key for the server
const secretKey = crypto.randomBytes(32).toString("hex");

console.log(secretKey);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

const User = require("./models/User");
const Branch = require("./models/Branch");
const DefaultCredential = require("./models/DefaultCredential");
const Wallet = require("./models/Wallet");

// Create a schema and model for storing the data in MongoDB
const InvitationSchema = new mongoose.Schema({
  // Define the structure of the data you want to store
  // Adjust this based on the structure of the response data from the API
  connection_id: String,
  // invitation: String,
  invitation: mongoose.Schema.Types.Mixed,
  invitation_url: String,
  did: String,
  status: String,
  recipientRole: String,
});

const InvitationModel = mongoose.model("Invitation", InvitationSchema);

// Create invitation endpoint
app.post("/create-invitation", createInvitationApiCall);

// CreateInvitationApiCall function
async function createInvitationApiCall(req, res) {
  try {
    const apiUrl = "http://localhost:8021/connections/create-invitation";
    const did = req.body.holderDID;
    const status = req.body.status;
    console.log("did:", did);

    // Data to send in the request body
    const postData = {};
    // Make the POST API call using axios
    const response = await axios.post(apiUrl, postData);
    // Handle the API response

    console.log("API response:", response.data);
    // Create a new instance of the Data model using the received data
    const newInvitation = new InvitationModel({
      // Assign the received data to the corresponding properties in the schema
      // Adjust this based on the properties of the response data
      connection_id: response.data.connection_id,
      invitation: response.data.invitation,
      invitation_url: response.data.invitation_url,
      did: did,
      status: status,
      recipientRole: "holder",
    });

    // Save the new data to MongoDB
    newInvitation
      .save()
      .then(() => {
        console.log("Data saved to MongoDB");
        res.json({ message: "Data stored successfully" });
      })
      .catch((error) => {
        console.error("Error saving data to MongoDB:", error);
        res.status(500).json({ error: "Failed to store data" });
      });
  } catch (error) {
    console.error("Error making POST API call:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update branch route
app.put("/update-branch/:holderDID", async (req, res) => {
  const holderDID = req.params.holderDID;
  const { invited } = req.body;

  try {
    const updatedBranch = await Branch.findOneAndUpdate(
      { holderDID: holderDID },
      { invited: invited },
      { new: true }
    ).exec();

    if (!updatedBranch) {
      console.error("Branch not found");
      return res.status(404).json({ error: "Branch not found" });
    }

    console.log("Branch updated successfully");
    res.json({ message: "Branch updated successfully", updatedBranch });
  } catch (error) {
    console.error("Failed to update branch:", error);
    res.status(500).json({ error: "Failed to update branch" });
  }
});

// Route to fetch all invitations sent by the issuer
app.get("/view-invitations", (req, res) => {
  // Fetch all invitations from the database
  InvitationModel.find({})
    .exec()
    .then((invitations) => {
      res.json(invitations);
    })
    .catch((err) => {
      console.error("Failed to fetch invitations from MongoDB:", err);
      res.status(500).json({ error: "Failed to fetch invitations" });
    });
});

// Route to fetch all franchise stores
app.get("/view-stores", (req, res) => {
  // Fetch all branches from the database
  Branch.find({})
    .exec()
    .then((branches) => {
      res.json(branches);
    })
    .catch((err) => {
      console.error("Failed to fetch invitations from MongoDB:", err);
      res.status(500).json({ error: "Failed to fetch invitations" });
    });
});
app.get("/check-credential/:did", checkCredentialApiCall);
// GET /check-credential/:did
async function checkCredentialApiCall(req, res) {
  try {
    const didHolder = req.params.did;

    // Check if a credential exists for the given didHolder
    const credential = await Wallet.findOne({ did: didHolder });

    const credentialExists = !!credential;
    res.json({ exists: credentialExists });
  } catch (error) {
    console.error("Error checking credential:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

app.post("/issue-credential", issueCredentialApiCall);
// ########### ISSUE CREDENTIAL ############
// issueCredentialApiCall function
async function issueCredentialApiCall(req, res) {
  try {
    const apiUrl = "http://localhost:8021/issue-credential/create-offer";
    const didHolder = req.body.didHolder;
    // Retrieve branch information from the database based on didHolder
    const branch = await Branch.findOne({ holderDID: didHolder });
    console.log(branch);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const postData = {
      auto_issue: true,
      auto_remove: true,
      comment: "string",
      cred_def_id:
        "9MZ8wxkBaohjf8VDfXTvQi:3:CL:107:orange_company.agent.store_legitimization_schema",
      credential_preview: {
        "@type": "issue-credential/1.0/credential-preview",
        attributes: [
          {
            name: "branch_name",
            value: `${branch.branchName}`,
          },
          {
            name: "branch_address",
            value: `${branch.location}`,
          },
          {
            name: "branch_longitude",
            value: `${branch.longitude}`,
          },
          {
            name: "branch_manager",
            value: `${branch.branchManager}`,
          },
          {
            name: "branch_latitude",
            value: `${branch.latitude}`,
          },
        ],
      },
      trace: true,
    };

    const response = await axios.post(apiUrl, postData);

    console.log("API response:", response.data);

    // Handle the response or save the verifiable credential to MongoDB if needed
    // Create a new instance of the Data model using the received data
    const newWallet = new Wallet({
      // Assign the received data to the corresponding properties in the schema
      // Adjust this based on the properties of the response data
      did: didHolder,
      credential_definition_id: response.data.credential_definition_id,
      schema_id: response.data.schema_id,
      // credential_offer: response.data.credential_offer,
      branch_name:
        response.data.credential_proposal_dict.credential_proposal.attributes[0]
          .value,
      branch_address:
        response.data.credential_proposal_dict.credential_proposal.attributes[1]
          .value,
      branch_longitude:
        response.data.credential_proposal_dict.credential_proposal.attributes[2]
          .value,
      branch_manager:
        response.data.credential_proposal_dict.credential_proposal.attributes[3]
          .value,
      branch_latitude:
        response.data.credential_proposal_dict.credential_proposal.attributes[4]
          .value,
      acceptedFromHolder: "no",
      legitimate: "yes",
      revokedByIssuer: "no",
    });

    // Save the new data to MongoDB
    newWallet
      .save()
      .then(() => {
        console.log("VerifiableCredential wallet saved to MongoDB");
        // Update the legitimizedFromIssuer field in the Branch collection
        Branch.updateOne(
          { holderDID: didHolder },
          { legitimizedFromIssuer: "yes" }
        )
          .then(() => {
            console.log("Branch collection updated successfully");
            res.json({
              message: "VerifiableCredential wallet stored successfully",
            });
          })
          .catch((error) => {
            console.error("Error updating Branch collection:", error);
            res
              .status(500)
              .json({ error: "Failed to update Branch collection" });
          });
      })
      .catch((error) => {
        console.error(
          "Error saving VerifiableCredential wallet to MongoDB:",
          error
        );
        res
          .status(500)
          .json({ error: "Failed to store VerifiableCredential wallet data" });
      });
  } catch (error) {
    console.error("Error making POST API call:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
// ########### ISSUE CREDENTIAL END ############

//View credential offer from holder
app.post("/view-credential-offer", (req, res) => {
  const { didHolder } = req.body;

  // Fetch credential offer from branch collection
  Branch.find({ holderDID: didHolder, legitimizedFromIssuer: "yes" })
    .exec()
    .then((credentials) => {
      res.json(credentials);
    })
    .catch((err) => {
      console.error("Failed to fetch credentials from MongoDB:", err);
      res.status(500).json({ error: "Failed to fetch credentials" });
    });
});

//routes register & login

// get def gred from DB
app.get("/defCred", (req, res) => {
  // Fetch all invitations from the database
  DefaultCredential.find({})
    .exec()
    .then((defaultCredentials) => {
      res.json(defaultCredentials);
    })
    .catch((err) => {
      console.error("Failed to fetch defaultCredentials from MongoDB:", err);
      res.status(500).json({ error: "Failed to fetch defaultCredentials" });
    });
});

// register-holder endpoint
app.post("/register-holder", async (req, res) => {
  const { username, userRole, password } = req.body;
  //The code above is telling bcrypt to hash the password received
  //from request body 10 times or 10 salt rounds
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    // ###########################
    // Make a request to retrieve the DID from the BC von network
    const vonRegisterUrl = "http://localhost:9000/register";
    const postData = {
      role: "ENDORSER",
      alias: `holder ${req.body.username}`,
      did: null,
      seed: req.body.username,
    };
    // Make the POST API call using axios
    const response = await axios.post(vonRegisterUrl, postData);
    console.log("API response:", response.data);
    // ###########################

    await User.create({
      username,
      userRole,
      password: encryptedPassword,
      // ###########################
      DID: response.data.did,
      // ###########################
    });

    // Save the DID in the Branch collection
    await Branch.updateMany(
      { holderDID: null },
      { holderDID: response.data.did }
    );

    //save default credentials
    await DefaultCredential.create({
      username,
      password,
    });

    res.send(req.body);
  } catch (error) {
    res.send({ status: "error" });
  }
});

//save default cred holder
// app.post("/save-defaultCredentials", async (req, res) => {
//   const { username, password } = req.body;
//   await DefaultCredential.create({
//     username,
//     password,
//   });
// });

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
    // ###########################
    // Make a request to retrieve the DID from the BC von network
    const vonRegisterUrl = "http://localhost:9000/register";
    const postData = {
      role: "ENDORSER",
      alias: `${req.body.userRole} ${req.body.username}`,
      did: null,
      seed: req.body.username,
    };
    // Make the POST API call using axios
    const response = await axios.post(vonRegisterUrl, postData);
    console.log("API response:", response.data);
    // ###########################

    await User.create({
      username,
      userRole,
      password: encryptedPassword,
      // ###########################
      DID: response.data.did,
      // ###########################
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
    // Find user in the database by username
    const user = await User.findOne({ username });

    // If user is not found, return error
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Store the username and user role in the session
    req.session.username = user.username;
    req.session.userRole = user.userRole;
    req.session.did = user.DID;

    // Send success response with user role and did
    res.json({
      success: true,
      username: user.username,
      userRole: user.userRole,
      did: user.DID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// //logout
app.post("/logout", (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3007, () => {
  console.log("connected to 3007");
});
