import React from "react";
import { Link } from "react-router-dom";
// import "../boosted/css/boosted.min.css";

function IssuerHome() {
  // window.location.reload();
  return (
    <div>
      <div className="bg-supporting-green title-bar">
        <div className="container-xxl">
          <h1 className="display-1">Welcome To Soverify Solution</h1>
        </div>
      </div>
      {/* <h1>Welcome To Soverify Solution</h1> */}
      {/* <br></br> */}
      <nav className="stepped-process" aria-label="Checkout process">
        <p className="float-start mt-2 me-2 fw-bold d-sm-none">Step</p>
        <ol>
          <li className="stepped-process-item">
            <a
              className="stepped-process-link"
              href="/view-stores"
              title="1. Send Connection Invitation"
            >
              Send Connection Invitation
            </a>
          </li>
          <li className="stepped-process-item ">
            <a
              className="stepped-process-link"
              title="2. Wait for Acceptation"
              aria-current="step"
              href="/view-stores"
            >
              Wait for Acceptation
            </a>
          </li>
          <li className="stepped-process-item">
            <a
              className="stepped-process-link"
              href="/view-stores"
              title="3. Legitimize Store"
            >
              Legitimize Store
            </a>
          </li>
          {/* <li className="stepped-process-item">
            <a className="stepped-process-link" href="#" title="4. Payment">
              Payment
            </a>
          </li>
          <li className="stepped-process-item">
            <a className="stepped-process-link" href="#" title="5. Place order">
              Place order
            </a>
          </li> */}
        </ol>
      </nav>

      <div className="card-container">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Generate Stores' Login Credentials</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              As a first step, you need to generate login credentials for the
              registered franchise stores.
            </p>
            <Link to="/view-stores" className="btn btn-primary">
              Generate Credentials
            </Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Send Invitations</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              The second step is to send a pairwise connection invitation yo the
              stores, to securely exchange data.
            </p>
            <Link to="/view-stores" className="btn btn-primary">
              Send Invitation
            </Link>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Verify Your Branch</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Last step is to legitimize the store by issuing a Verifiable
              Credential.
            </p>
            <Link to="/view-stores" className="btn btn-primary">
              Issue Credential
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssuerHome;
