import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="mx-auto">
          <Link to="/">Magic: The Gathering</Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
