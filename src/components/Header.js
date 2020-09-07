import React, { useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const navBar = React.createRef();
  const handleScroll = () => {
      if (50 < window.pageYOffset) {
        navBar.current.classList.add('unscrolled');
        navBar.current.classList.remove('scrolled');
      } else {
        navBar.current.classList.add('scrolled');
        navBar.current.classList.remove('unscrolled');
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, {
        passive: true
      });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className="animated-navbar unscrolled" ref={navBar}>
      <Navbar expand="lg" className="fixed-top">
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
