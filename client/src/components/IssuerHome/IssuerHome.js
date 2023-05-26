import React from "react";
import { Link } from "react-router-dom";
import "../boosted/css/boosted.min.css";

function IssuerHome() {
  // window.location.reload();
  return (
    <div>
      <h1>Welcome {} To Soverify Solution</h1>
      <div className="card-container">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Send Invitations</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Here you can create an invitation to start a communication with
              the franchise branch you will legitimize.
            </p>
            <Link to="/create-invitation" className="btn btn-primary">
              Create Invitation
            </Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">View Invitations</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Here you can check the status of the Invitations you sent.
            </p>
            <Link to="/view-invitations" className="btn btn-primary">
              View Invitations
            </Link>
          </div>
        </div>
        {/* <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Verify Your Branch</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Here the Branch Manager who represents the Holder accepts the
              invitations the Issuer sent them.
            </p>
            <Link to="/login" className="btn btn-primary">
              Accept Invitation
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default IssuerHome;
