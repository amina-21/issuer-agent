import "./App.css";
// import "./components/boosted/css/boosted.min.css";
import 'boosted/dist/css/boosted.min.css';
import 'boosted/dist/js/boosted.min.js';
// import boosted from 'boosted/dist/js/boosted.bundle.min';
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import NavBarAll from "./components/NavBar/NavBarAll";
import Login from "./components/Login/Login";
import IssuerHome from "./components/IssuerHome/IssuerHome";
import ViewInvitations from "./components/ViewInvitations/ViewInvitations";
import IssueCredential from "./components/IssueCredential/IssueCredential";
import ViewStores from "./components/ViewStores/ViewStores";
import { useEffect, useState } from "react";
import NavBarIssuer from "./components/NavBar/NavBarIssuer";
import GenerateStoreCred from "./components/GenerateStoreCred/GenerateStoreCred";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";

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
    } else {
      setShowNavbar(false);
    }
  }, [userRole]);

  return (
    <div>
      <BrowserRouter>
        {showNavbar && userRole === "Issuer" && (
          <NavBarIssuer onLogout={handleLogout} />
        )}

        {!userRole  && <NavBarAll />}

        {/* <NavBarAll /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/issuer-home" element={<IssuerHome />} />

          {/* <Route path="/create-invitation" element={<CreateInvitation />} /> */}
          <Route path="/view-invitations" element={<ViewInvitations />} />
          <Route path="/view-stores" element={<ViewStores />} />
          <Route path="/generate-cred" element={<GenerateStoreCred />} />
          <Route path="/issue-credential/:did" element={<IssueCredential />} />
          
        </Routes>
        <BackToTop/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
