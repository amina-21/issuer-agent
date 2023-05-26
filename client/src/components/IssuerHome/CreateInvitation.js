import React, { useState } from "react";
import "../boosted/css/boosted.min.css";
//import "../boosted/js/boosted.bundle.min.js";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Popup from "reactjs-popup";

function CreateInvitation() {
  const [did, setDid] = useState("");
  // const [msg, setMsg] = useState("");

  // const [invitation, setInvitation] = useState("");

  const handleChange = (e) => {
    setDid(e.target.value);
  };

  function handleSendInvitation(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3007/create-invitation", {
        did: did,
        status: "pending",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Clear fields and perform other necessary actions
    setDid("");
    onClose();
  }

  // function handleSendInvitation(e) {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:8021/connections/create-invitation")
  //     .then((response) => {
  //       console.log(response.data);
  //       // Call another API or perform additional actions with the response data if needed

  //       // Call your MongoDB backend API to store the data
  //       axios
  //         .post("http://localhost:3007/create-invitation", {
  //           // Pass the response data or any specific properties you want to store in MongoDB
  //           data: response.data,
  //         })
  //         .then((mongoResponse) => {
  //           console.log("Data stored in MongoDB:", mongoResponse.data);
  //           // Perform any additional actions after storing data in MongoDB if needed
  //         })
  //         .catch((mongoError) => {
  //           console.error("Error storing data in MongoDB:", mongoError);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   // Clear fields and perform other necessary actions
  //   setDid("");
  //   onClose();
  // }

  const [showModal, setShowModal] = useState(false);
  let onClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <h1>Welcome To Soverify Solution</h1>
      {/* <button
        className="btn btn-primary"
        onClick={() => {
          var config = {
            method: "post",
            url: "http://localhost:8021/connections/create-invitation",
            data: JSON.stringify({}),
          };
          axios(config).then(function (response) {
            console.log(response);
            setInvitation(response);

          });
        }}
      >
        Create Invitation
      </button> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Send an Invitation to a Branch Agent
      </button>

      {showModal && (
        <Modal fullscreen="true" show={showModal} onHide={onClose} centered>
          <Popup
            trigger={
              <div
                id="exampleModal"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                aria-modal="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Send an Invitation to a Branch to Connect
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={() => {
                          onClose();
                        }}
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Recipient DID:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                            name="holder-did"
                            onChange={handleChange}
                            value={did}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSendInvitation}
                      >
                        Send Invitation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          ></Popup>
        </Modal>
      )}
    </div>
  );
}

export default CreateInvitation;
