import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qrcode from "qrcode";
import axios from "axios";

function GenerateStoreCred() {
  const location = useLocation();
  const branch = location.state?.branch;
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [defCred, setDefCred] = useState([]);
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);

  useEffect(() => {
    const fetchDefaultCredentials = async () => {
      try {
        const response = await axios.get("http://localhost:3007/defCred");
        const data = response.data;
        if (Array.isArray(data)) {
          setDefCred(data);
        } else {
          console.error("def creds data is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchDefaultCredentials();
  }, []);

  if (!branch) {
    return <div>Error: Missing branch data</div>;
  }

  const generateRandomPassword = () => {
    // Generate a random password
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  const username = branch.branchManager;

  const handleGenerateQRCode = async () => {
    const defaultCred = defCred.find((cred) => cred.username === username);

    if (defaultCred) {
      const credentialData = JSON.stringify({
        username: defaultCred.username,
        password: defaultCred.password,
      });

      await generateQRCode(credentialData);
    } else {
      const password = generateRandomPassword();

      try {
        const response = await axios.post(
          "http://localhost:3007/register-holder",
          {
            username: username,
            password: password,
            userRole: "Holder",
          }
        );

        console.log("Credentials saved successfully");

        const credentialData = JSON.stringify({
          username: response.data.username,
          password: response.data.password,
        });

        await generateQRCode(credentialData);
      } catch (error) {
        console.error("Failed to save credentials:", error);
      }
    }
  };

  const generateQRCode = async (credentialData) => {
    try {
      const url = await qrcode.toDataURL(credentialData);
      setQrCodeUrl(url);
      setIsQRCodeGenerated(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Generate Login Credentials for {branch.branchName}</h1>
      <div className="card" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title">{branch.branchName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {branch.branchManager}
          </h6>
          <p className="card-text">
            Generate a QR code containing Login credentials to send
            traditionally (on paper) to this store.
          </p>
          <button
            className="btn btn-light"
            onClick={handleGenerateQRCode}
            disabled={isQRCodeGenerated}
          >
            {isQRCodeGenerated ? "QR code generated" : "Generate QR code"}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-light">Print</button>
        </div>
      </div>
      {qrCodeUrl && (
        <div className="container" style={{ marginTop: "20px" }}>
          <img className="card" src={qrCodeUrl} alt="QR code" />
        </div>
      )}
    </div>
  );
}

export default GenerateStoreCred;
