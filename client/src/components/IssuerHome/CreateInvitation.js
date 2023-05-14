import React, { useEffect, useState } from "react";
// import "./CreateInvitation.css";
import axios from "axios";
import "../boosted/css/boosted.min.css"

function CreateInvitation() {
  // const [companyName, setCompanyName] = useState("");
  // const [branchName, setBranchName] = useState("");
  // const [managerName, setManagerName] = useState("");
  // const [recKey, setRecKey] = useState("");
  // const [routeKey, setRouteKey] = useState("");

  // axios
  //   .post("/createInvitation", {
  //     firstName: "Fred",
  //     lastName: "Flintstone",
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const response = await fetch(
  //     "http://localhost:8020/connections/create-invination",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "connections/create-invination",
  //       },
  //       body: JSON.stringify({
  //         companyName,
  //         branchName,
  //         managerName,
  //         recKey,
  //         routeKey,
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     console.log("Invitation created successfully");
  //   } else {
  //     console.error("Failed to create invitation");
  //   }
  // };

//   const [data, setlistData] = useState([]);
//   useEffect(() => {
//     const createInvitation = async () => {
//       //event.preventDefault();

//       try {
//         const { data } = await axios.get(
//           //"http://localhost:8021/connections/create-invitation"
//           // "http://localhost:8021/api/doc#/connection/post_connections_create_invitation"
//           //"http://10.241.67.132:8021/api/doc#/connection/post_connections_create_invitation"
//           "https://jsonplaceholder.typicode.com/users"
//           // "http://localhost:8021/connections/create-invitation?alias=faber&auto_accept=true&multi_use=true&public=true"
//           // "http://localhost:8021/connections/create-invitation"
//           //"http://localhost:8021/connections"
//         );
//         setlistData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     createInvitation();
//   }, []);

axios
      .post("http://localhost:3007/register", {
        username: user.username,
        userRole: user.userRole,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data, "userRegister");
        if (res.data.status === "ok") {
          alert("Registration Successful");
          setUserRoleDefault("Open this to select your role"); // reset the select field value to default
          navigate("/login");
        } else {
          alert("User Already Registered !");
        }
      })
      .catch((err) => console.log(err));
    // clear up the field after submission
    setUser({ username: "", userRole: "", password: "" });
  }

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        {data.map((info) => (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{info.alias}</li>
            <li className="list-group-item">{info.connection_protocol}</li>
            <li className="list-group-item">{info.invitation_key}</li>
            <li className="list-group-item">{info.invitation_msg_id}</li>
            <li className="list-group-item">{info.my_did}</li>
            <li className="list-group-item">{info.state}</li>
            {/* <li className="list-group-item">{info.their_did}</li>
            <li className="list-group-item">{info.their_public_did}</li> */}
            <li className="list-group-item">{info.their_role}</li>
            <li className="list-group-item">{info.email}</li>
          </ul>
        ))}
        </div>
        {/* <form className="formDisplay">
        <h2>Create Invitation</h2>
        <h3>New connection invitation to the holders</h3>

        <div className="mb-3">
          <label htmlFor="exampleInputCompanyLabel" className="form-label">
            Company Label (med Id)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputCompanyLabel"
            aria-describedby="companyLabel"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputBranchName" className="form-label">
            Branch Name (metadata)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputBranchName"
            aria-describedby="branchName"
            value={branchName}
            onChange={(event) => setBranchName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputBranchManager" className="form-label">
            Branch manager (label)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputBranchManagaer"
            aria-describedby="branchManager"
            value={managerName}
            onChange={(event) => setManagerName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputReceipientKey" className="form-label">
            Receipient Key
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputReceipientKey"
            aria-describedby="ReceipientKey"
            value={recKey}
            onChange={(event) => setRecKey(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputRoutingKey" className="form-label">
            Routing Key
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRoutingKey"
            aria-describedby="RoutingKey"
            value={routeKey}
            onChange={(event) => setRouteKey(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={createInvitation}
        >
          Send Invitation
        </button>
        </form> */}
        <footer className="o-footer" role="contentinfo" style={{position: "fixed",left: "0",bottom: "0", width: "100%", textAlign: "center"}}>
        
          <div className="o-footer-bottom">
            <div className="container-fluid">
              <ul className="nav">
                <li className="nav-item">
                  <span className="nav-link">© Orange 2023</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Advertise
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Privacy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Cookies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Access for all
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Safety online
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </footer>
      
    </div>
  );
}

export default CreateInvitation;
