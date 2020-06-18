import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <span className="position-absolute trigger"></span>
      <Navbar expand="lg" className="sticky-top">
        <Container>
          <Navbar.Brand className="mx-auto">
            <Link to="/">Magic: The Gathering</Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
    </div>
  );
}
