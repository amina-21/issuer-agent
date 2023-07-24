import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import Popup from "reactjs-popup";

function IssueCredential() {
  const { did } = useParams();
  const [isCredentialOfferSent, setIsCredentialOfferSent] = useState(false);

  useEffect(() => {
    // Check if a credential exists for the didHolder
    axios
      .get(`http://localhost:3007/check-credential/${did}`)
      .then((response) => {
        const credentialExists = response.data.exists;
        setIsCredentialOfferSent(credentialExists);
      })
      .catch((error) => {
        console.error("Failed to check credential:", error);
      });
  }, [did]);

  const handleIssueCredential = () => {
    axios
      .post("http://localhost:3007/issue-credential", { didHolder: did })
      .then(() => {
        setIsCredentialOfferSent(true);
      })
      .catch((error) => {
        console.error("Failed to send credential offer:", error);
      });
  };

  return (
    <div>
      <div>
        <div className="bg-supporting-green title-bar">
          <div className="container-xxl">
            <h1 className="display-1">Click to Legitimize the Store</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <br></br>
        {isCredentialOfferSent ? (
          <p>Credential offer sent!</p>
        ) : (
          <button
            className="btn btn-light"
            onClick={handleIssueCredential}
            disabled={isCredentialOfferSent}
          >
            {isCredentialOfferSent
              ? "Credential Offer Sent"
              : "Issue Credential"}
          </button>
        )}
      </div>
    </div>
  );
}

export default IssueCredential;
