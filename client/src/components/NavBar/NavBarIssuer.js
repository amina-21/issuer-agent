import React from "react";
import logo from "./orange-logo.png";
// import "../boosted/css/boosted.min.css";
// import "../boosted/js/boosted.bundle.min.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import UserContext from "../UserContext";

function NavBarIssuer() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .post("http://localhost:3007/logout")
      .then(() => {
        // Clear session storage
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userRole");

        // Redirect to the login page
        navigate("/login");
        window.location.reload()
      })
      .catch((err) => console.log(err));
  }

  // const { handleLogout } = useContext(UserContext);
  // const handleLogoutClick = () => {
  //   handleLogout();
  //   navigate("/logout");
  // };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a className="stretched-link" href="/issuer-home">
              <img
                src={logo}
                width={50}
                height={50}
                alt="Boosted - Back to Home"
                loading="lazy"
              />
            </a>
          </div>
          <div className="navbar-toggle">
            <button
              className="navbar-toggler"
              id="toggle-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a
                  className={`nav-link ${
                    location.pathname === "/issuer-home" ? "active" : ""
                  }`}
                  href="/issuer-home"
                  aria-current="page"
                >
                  Home Issuer
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/create-invitation" ? "active" : ""
                  }`}
                  href="/create-invitation"
                >
                  Create Invitation
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/view-invitations" ? "active" : ""
                  }`}
                  href="/view-invitations"
                >
                  Invitations
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/view-stores" ? "active" : ""
                  }`}
                  href="/view-stores"
                >
                  Stores
                </a>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    location.pathname === "/logout" ? "active" : ""
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarIssuer;
