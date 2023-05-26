import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import Popup from "reactjs-popup";

function IssueCredential() {
  const { did } = useParams();
  const [isCredentialOfferSent, setIsCredentialOfferSent] = useState(false);

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
    <div className="container">
      <h2 style={{ padding: "20px" }}>
        Hello Issuer, in order to legitimize this branch you need to follow
        these steps to issue the Verifiable Credential:
      </h2>
      {/* <ul>
        <li>
          <b>Step 1:</b> Click on <i>Create Schema</i> to define the structure
          of the Verifiable Credential you want to issue &nbsp;
        </li>
        <li>
          <b>Step 2:</b> Create the Credential Definition for the Specific
          Schema: this will allow you to create the necessary cryptographic keys
          for a secure information.
        </li>
        <li>
          <b>Step 3:</b> Issue Credential and Send it to the Holder which is the
          Branch you want to legitmize
        </li>
      </ul> */}
      {isCredentialOfferSent ? (
        <p>Credential offer sent!</p>
      ) : (
        <button
          className="btn btn-light"
          onClick={handleIssueCredential}
          disabled={isCredentialOfferSent}
        >
          {isCredentialOfferSent ? "Credential Offer Sent" : "Issue Credential"}
        </button>
      )}
    </div>
  );
}

export default IssueCredential;
