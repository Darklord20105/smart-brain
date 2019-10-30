import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = ({ onRouteChange, isSignedIn }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SMART BRAIN AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isSignedIn ? (
            <Nav className="ml-auto">
              <Nav.Link onClick={() => onRouteChange("signout")}>
                Log Out
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link onClick={() => onRouteChange("signup")}>
                Register
              </Nav.Link>
              <Nav.Link onClick={() => onRouteChange("signin")}>
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
