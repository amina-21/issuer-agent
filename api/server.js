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
});

const InvitationModel = mongoose.model("Invitation", InvitationSchema);

// create invitation
// app.post("/create-invitation", (req, res) => {
//   // Create a new instance of the Data model using the received data
//   const newInvitation = new InvitationModel({
//     // Assign the received data to the corresponding properties in the schema
//     // Adjust this based on the properties of the response data
//     connection_id: req.body.connection_id,
//     invitation: req.body.invitation,
//     invitation_url: req.body.invitation_url,

//   });

//   // Save the new data to MongoDB
//   newInvitation
//     .save()
//     .then(() => {
//       console.log("Data saved to MongoDB");
//       res.status(200).json({ message: "Data stored successfully" });
//     })
//     .catch((error) => {
//       console.error("Failed to save data to MongoDB:", error);
//       res.status(500).json({ error: "Failed to store data" });
//     });
// });

// Create invitation endpoint
app.post("/create-invitation", createInvitationApiCall);

// CreateInvitationApiCall function
async function createInvitationApiCall(req, res) {
  try {
    const apiUrl = "http://localhost:8021/connections/create-invitation";
    const did = req.body.did;
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

// View invitation Holder endpoint
app.post("/view-invitation-holder", (req, res) => {
  const { did } = req.body;

  // Fetch invitations dedicated to itd DID from the database
  InvitationModel.find({ did })
    .exec()
    .then((invitations) => {
      res.json(invitations);
    })
    .catch((err) => {
      console.error("Failed to fetch invitations from MongoDB:", err);
      res.status(500).json({ error: "Failed to fetch invitations" });
    });
});

// Accept Invitation Holder
app.post("/accept-invitation", (req, res) => {
  const { connId } = req.body;

  // Update the status of the invitation in MongoDB
  InvitationModel.findOneAndUpdate(
    { connection_id: connId },
    { $set: { status: "accepted" } },
    { new: true }
  )
    .then((updatedInvitation) => {
      // Handle the updated invitation
      res.json(updatedInvitation);
    })
    .catch((error) => {
      console.error("Failed to accept invitation:", error);
      res.status(500).json({ error: "Failed to accept invitation" });
    });
});

//Issue credential offer
app.post("/issue-credential", (req, res) => {
  const { didHolder } = req.body;
  Branch.findOneAndUpdate(
    { holderDID: didHolder }, // Filter for the document to update
    { $set: { legitimizedFromIssuer: "yes" } }, // Update the field
    { new: true } // Return the updated document
  )
    .then((updatedBranch) => {
      // Handle the updated branch
      res.json(updatedBranch);
    })
    .catch((error) => {
      // Handle the error
      console.error("Failed to update branch:", error);
      res.status(500).json({ error: "Failed to update branch" });
    });
});

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

// Accept credential offer
app.post("/accept-credential-offer", (req, res) => {
  const { did } = req.body;
  Branch.findOneAndUpdate(
    { holderDID: did }, // Filter for the document to update
    { $set: { acceptedFromHolder: "yes" } }, // Update the field
    { new: true } // Return the updated document
  )
    .then((updatedBranch) => {
      // Handle the updated branch
      res.json(updatedBranch);
    })
    .catch((error) => {
      // Handle the error
      console.error("Failed to update branch:", error);
      res.status(500).json({ error: "Failed to update branch" });
    });
});

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
