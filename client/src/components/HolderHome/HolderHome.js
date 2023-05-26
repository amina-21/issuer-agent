import React from "react";
import { Link } from "react-router-dom";

function HolderHome() {
  return (
    <div>
      <h1>Holder, Welcome To Soverify Solution !</h1>
      <div className="card-container">
      <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Send Invitations</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Here you can create an invitation to start a communication with
              the company you want to hold its identity.
            </p>
            <Link to="/create-invitation" className="btn btn-primary">
              Create Invitation
            </Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Accept Invitations</h5>
            <p className="card-text fw-bold mb-4" style={{ height: "90px" }}>
              Here you can accept an invitation to start a communication with
              the company you want to hold its identity.
            </p>
            <Link to="/view-invitation-holder" className="btn btn-primary">
              Accept Invitation
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default HolderHome;
