import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Viewstores() {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3007/view-stores")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch stores:", error);
      });
  };

  const sendInvitation = (holderDID) => {
    axios
      .post("http://localhost:3007/create-invitation", {
        holderDID: holderDID,
        status: "pending",
      })
      .then((response) => {
        console.log("Invitation sent successfully");
        // Update the invited property of the corresponding branch in the database
        axios
          .put(`http://localhost:3007/update-branch/${holderDID}`, {
            invited: "yes",
          })
          .then(() => {
            console.log("Branch updated successfully");
            fetchData(); // Fetch updated data after successful update
          })
          .catch((error) => {
            console.error("Failed to update branch:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to send invitation:", error);
      });
  };

  return (
    <div>
      <div className="bg-supporting-pink title-bar">
        <div className="container-xxl">
          <h1 className="display-1">List of Franchise stores</h1>
        </div>
      </div>
      <div className="container">
        <style
          successouslySetInnerHTML={{
            __html:
              "\n  .table-container {\n    max-width: 100%;\n    overflow-x: auto;\n  }\n\n  .table {\n    width: 100%;\n    table-layout: fixed;\n    border-collapse: collapse;\n  }\n\n  .table td {\n    word-wrap: break-word;\n    max-width: 200px; /* Adjust the value as needed */\n    white-space: normal;\n  }\n",
          }}
        />

        <table className="table">
          {/* <caption>List of Franchise stores</caption> */}
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Branch Name</th>
              {/* <th scope="col">Invitation</th>*/}
              {/* <th scope="col">Branch Manager Username</th>  */}
              <th scope="col">Store Manager DID</th>
              <th scope="col" style={{ width: '200px' }}>Store Manager Name</th>
              <th scope="col">Store's Login Credential</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch._id}>
                <th scope="row">{index + 1}</th>
                <td>{branch.branchName}</td>
                {/* <td>{JSON.stringify(invitation.invitation)}</td>*/}
                {/* <td>
                <a href={invitation.invitation_url}>invitation</a>
              </td> */}
                <td>{branch.holderDID}</td>
                <td>{branch.branchManager}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      navigate(`/generate-cred`, { state: { branch: branch } });
                    }}
                  >
                    Generate Store Default Credentials
                  </button>
                </td>
                <td>
                  {branch.invited === "no" ? (
                    <div>
                      <button
                        style={{ width: "150px", height: "50px" }}
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {
                          sendInvitation(branch.holderDID);
                        }}
                      >
                        Send Invitation
                      </button>
                      &nbsp;&nbsp; <br></br> <br></br>
                      <button
                        style={{ width: "150px", height: "50px" }}
                        type="button"
                        className="btn btn-info"
                        disabled
                      >
                        Legitimize
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        style={{ width: "150px", height: "50px" }}
                        type="button"
                        className="btn btn-warning"
                        onClick={() => sendInvitation(branch.holderDID)}
                        disabled
                      >
                        Send Invitation
                      </button>
                      &nbsp;&nbsp; <br></br> <br></br>
                      <button
                        style={{ width: "150px", height: "50px" }}
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate("/view-invitations")} // Pass the DID as a parameter in the URL
                      >
                        Legitimize
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

export default Viewstores;
