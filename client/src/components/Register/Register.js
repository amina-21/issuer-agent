import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import iconAuth from "../assets/iconAuth.PNG";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    userRole: "",
    password: "",
  });
  const [userRoleDefault, setUserRoleDefault] = useState(
    "Open this to select your role"
  );

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator used because we put the user state as an object, so we need to spread it to ba able to use it: e.g. user.username, user.password
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user.username, user.userRole, user.password);

    axios
      .post("http://localhost:3007/register", {
        username: user.username,
        userRole: user.userRole,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data, "userRegister");
        if (res.data.status === "ok") {
          //alert("Registration Successful");
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
      <div className="bg-supporting-purple title-bar">
        <div className="container-xxl">
          <h1 className="display-1">Register To Use Soverify Solution</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* <h3>Get a Hold on Your DID to Use Soverify</h3> */}
        <div className="account-div">
          <img src={iconAuth} alt="iconAuth" width={45} />
          <h1>Account</h1>
        </div>
        <div className="formDisplay">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleInputUserName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUserName"
              aria-describedby="nameLabel"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleInputUserRole" className="form-label">
              User Role
            </label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="userRole"
              value={user.userRole}
              onChange={handleChange}
            >
              <option value={userRoleDefault}>{userRoleDefault}</option>
              <option value="Issuer">Issuer</option>
              <option value="Holder">Holder</option>
            </select>
          </div>

          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              aria-describedby="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btnDisplay">
          <button type="submit" className="btn btn-primary">
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
