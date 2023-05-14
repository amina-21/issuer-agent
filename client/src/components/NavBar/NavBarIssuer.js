import React from "react";
import logo from "./orange-logo.png";
function NavBarIssuer() {
  return (
    <div>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <a className="stretched-link" href="./NavBar.js">
              <img
                src={logo}
                width={50}
                height={50}
                alt="Boosted - Back to Home"
                loading="lazy"
              />
            </a>
            <h1 className="title">Company Agent</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarIssuer;
