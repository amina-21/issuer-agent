import "./App.css";

import "./components/boosted/css/boosted.min.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/Register/Register";
import NavBarAll from "./components/NavBar/NavBarAll";
import Login from "./components/Login/Login";
import React, { useEffect, useState } from "react";
import IssuerHome from "./components/IssuerHome/IssuerHome";
import HolderHome from "./components/HolderHome/HolderHome";
import NavBarIssuer from "./components/NavBar/NavBarIssuer";
import NavBarHolder from "./components/NavBar/NavBarHolder";
import CreateInvitation from "./components/IssuerHome/CreateInvitation";
import ViewInvitations from "./components/IssuerHome/ViewInvitations";
import ViewInvitationHolder from "./components/HolderHome/ViewInvitationHolder";
import FormBranch from "./components/HolderHome/FormBranch";
import IssueCredential from "./components/IssuerHome/IssueCredential";
import ViewCredentialOffer from "./components/HolderHome/ViewCredentialOffer";
// import UserContext from "./components/UserContext";
// import UserProvider from "./components/UserProvider";

function App() {
  const [userRole, setUserRole] = useState("");

  // Retrieve user role from session storage on component mount
  useEffect(() => {
    const storedUserRole = sessionStorage.getItem("userRole");
    setUserRole(storedUserRole);
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    // Clear user role from session storage
    sessionStorage.removeItem("userRole");
    setUserRole("");
  };

  const [showNavbar, setShowNavbar] = useState(false);
  // Determine which navbar to show based on user role
  useEffect(() => {
    if (userRole === "Issuer") {
      setShowNavbar(true);
    } else if (userRole === "Holder") {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [userRole]);

  //let navbarComponent;

  // Determine the appropriate navbar component based on the user role
  // switch (userRole) {
  //   case "Issuer":
  //     navbarComponent = <NavBarIssuer onLogout={handleLogout} />;
  //     break;
  //   case "Holder":
  //     navbarComponent = <NavBarHolder onLogout={handleLogout} />;
  //     break;
  //   default:
  //     navbarComponent = <NavBarAll />;
  //     break;
  // }

  // const { userRole } = useContext(UserContext);

  // let navbarComponent;

  // switch (userRole) {
  //   case "Issuer":
  //     navbarComponent = <NavBarIssuer />;
  //     break;
  //   case "Holder":
  //     navbarComponent = <NavBarHolder />;
  //     break;
  //   default:
  //     navbarComponent = <NavBarAll />;
  //     break;
  // }

  return (
    <div>
      <BrowserRouter>
        {/* conditionally render navbar based on user role */}
        {/* {navbarComponent} */}
        {showNavbar && userRole === "Issuer" && (
          <NavBarIssuer onLogout={handleLogout} />
        )}
        {showNavbar && userRole === "Holder" && (
          <NavBarHolder onLogout={handleLogout} />
        )}
        {!showNavbar && <NavBarAll />}
        {/* <NavBarAll /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/issuer-home" element={<IssuerHome />} />
          <Route path="/holder-home" element={<HolderHome />} />
          <Route path="/create-invitation" element={<CreateInvitation />} />
          <Route path="/view-invitations" element={<ViewInvitations />} />
          <Route
            path="/view-invitation-holder"
            element={<ViewInvitationHolder />}
          />
          <Route path="/form-branch" element={<FormBranch />} />
          <Route path="/issue-credential/:did" element={<IssueCredential />} />
          <Route
            path="/view-credential-offer"
            element={<ViewCredentialOffer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
