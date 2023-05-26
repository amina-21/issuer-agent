// //Dispatch login Action

// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user, //spread operator
//       [name]: value,
//     });
//   };

//   function handleSubmit(e) {
//     e.preventDefault();

//     axios
//       .post("http://localhost:3007/login", {
//         username: user.username,
//         password: user.password,
//       })
//       .then((res) => {
//         console.log(res.data, "userLogin");
//         // Check for token and role properties in response
//         if (res.data.token && res.data.role) {
//           // Store user information in local storage
//           localStorage.setItem("userRole", res.data.role);
//           localStorage.setItem("username", user.username);

//           // Redirect user to respective home page
//           if (res.data.role === "Issuer") {
//             navigate("/issuer-home");
//           } else if (res.data.role === "Holder") {
//             navigate("/holder-home");
//           }
//         } else {
//           alert("Invalid Username or Password");
//         }
//       })
//       .catch((err) => console.log(err));

//     // Clear form fields after submission
//     setUser({ username: "", password: "" });
//   }

//   return (
//     <div>
//       <form className="formDisplay" onSubmit={handleSubmit}>
//         <h2>Login To Use Soverify solution</h2>
//         <h3>You are One Step Away to Use Soverify</h3>

//         <div className="mb-3">
//           <label htmlFor="exampleInputUserName" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputUserName"
//             aria-describedby="nameLabel"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword"
//             aria-describedby="password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>

//       <h4 style={{ textAlign: "center" }}>
//         if you don't have an account{" "}
//         <a href="/register" className="link-light">
//           Register here
//         </a>
//       </h4>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3007/login", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        console.log(res.data, "userLogin");
        if (res.data.success) {
          // Store user information in session storage
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("userRole", res.data.userRole);
          sessionStorage.setItem("did", res.data.did);

          // Redirect user to respective home page
          if (res.data.userRole === "Issuer") {
            navigate("/issuer-home");
          } else if (res.data.userRole === "Holder") {
            navigate("/holder-home");
          }
        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch((err) => console.log(err));

    // Clear form fields after submission
    setUser({ username: "", password: "" });

    
  }

  return (
    <div>
      <form className="formDisplay" onSubmit={handleSubmit}>
        <h2>Login To Use Soverify solution</h2>
        <h3>You are One Step Away to Use Soverify</h3>

        <div className="mb-3">
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

        <div className="mb-3">
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <h4 style={{ textAlign: "center" }}>
        If you don't have an account{" "}
        <a href="/register" className="link-light">
          Register here
        </a>
      </h4>
    </div>
  );
}

export default Login;
