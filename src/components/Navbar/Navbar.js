import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Modal,
} from "react-bootstrap";
import {
  AccountCircle,
  AdminPanelSettings,
  Home,
  Flight,
  Reviews,
  ContactMail,
  ExitToApp,
  Login,
} from "@mui/icons-material";
import "./Navbar.css";
import LoginForm from "../Login/Login";
import SignupForm from "../Signup/MultiStepForm";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          {/* Logo and Brand Name */}
          <div className="brand-container">
            <Navbar.Brand as={Link} to="/">
              <img
                src="https://res.cloudinary.com/drvwcgnpv/image/upload/v1740246248/users/ru8txwe8bfks0ulhoka7.webp" // Update with actual logo path
                alt="Brand Logo"
                className="logo rounded-circle"
              />
              <span className="brand-name">
                Radhey Radhey Shyam Mila De Trust
              </span>
            </Navbar.Brand>
          </div>

          {/* Toggle Button for Mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Public Routes */}
              <Nav.Link as={Link} to="/">
                <Home /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/trips">
                <Flight /> Trips
              </Nav.Link>
              <Nav.Link as={Link} to="/reviews">
                <Reviews /> Reviews
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                <ContactMail /> Contact Us
              </Nav.Link>

              {/* Admin Dashboard */}
              {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/admin">
                  <AdminPanelSettings /> Admin
                </Nav.Link>
              )}

              {/* User Authentication */}
              {user ? (
                <NavDropdown
                  title={
                    <span className="user-info d-flex align-items-center">
                      <img
                        src={user.photoURL || "/default-user.png"} // Default image if not available
                        alt="User"
                        className="user-photo rounded-circle"
                      />
                      <span className="user-name">Hi, {user.name}</span>
                    </span>
                  }
                  id="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <AccountCircle /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>
                    <ExitToApp /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="auth-buttons">
                  <Button
                    variant="outline-light"
                    onClick={() => setShowLogin(true)}
                  >
                    <Login /> Login
                  </Button>
                  <Button variant="warning" onClick={() => setShowSignup(true)}>
                    Signup
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
          />
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
