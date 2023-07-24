import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewInvitations() {
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  // const [showActionButtons, setShowActionButtons] = useState(true);

  useEffect(() => {
    // Fetch data from the backend server
    axios
      .get("http://localhost:3007/view-invitations")
      .then((response) => {
        //setInvitations(response.data);
        const data = response.data;
        if (Array.isArray(data)) {
          setInvitations(data);
        } else {
          console.error("Invitations data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch invitations:", error);
      });
  }, []);
  //  onClick={() => sendInvitation(branch.holderDID)}
  return (
    <div>
      <div>
        <div className="bg-supporting-purple title-bar">
          <div className="container-xxl">
            <h1 className="display-1">List of Invitations Sent to Stores</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  .table-container {\n    max-width: 100%;\n    overflow-x: auto;\n  }\n\n  .table {\n    width: 100%;\n    table-layout: fixed;\n    border-collapse: collapse;\n  }\n\n  .table td {\n    word-wrap: break-word;\n    max-width: 200px; /* Adjust the value as needed */\n    white-space: normal;\n  }\n",
          }}
        />

        <table className="table">
          {/* <caption>List of Invitations Sent to Branches</caption> */}
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Connection ID</th>
              {/* <th scope="col">Invitation</th>*/}
              {/* <th scope="col">Branch Manager Username</th>  */}
              <th scope="col">Receiver DID</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation, index) => (
              <tr key={invitation._id}>
                <th scope="row">{index + 1}</th>
                <td>{invitation.connection_id}</td>
                {/* <td>{JSON.stringify(invitation.invitation)}</td>*/}
                {/* <td>
                <a href={invitation.invitation_url}>invitation</a>
              </td> */}
                <td>{invitation.did}</td>
                <td>{invitation.status}</td>

                <td>
                  {invitation.status === "pending" ? (
                    <div>
                      <button type="button" className="btn btn-danger">
                        Delete
                      </button>
                      &nbsp;&nbsp;
                      <button type="button" className="btn btn-warning">
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="button" className="btn btn-danger" disabled>
                        Delete
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-warning"
                        disabled
                      >
                        Update
                      </button>
                      <br></br>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          const did = invitation.did; // Get the DID value from the current invitation
                          navigate(`/issue-credential/${did}`); // Pass the DID as a parameter in the URL
                        }}
                      >
                        Legitimize&nbsp; &nbsp;Branch
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewInvitations;
