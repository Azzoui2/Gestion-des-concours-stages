// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top"> {/* Changer bg et variant */}
      <Container>
        <Navbar.Brand as={Link} to="/">Concours [Informatique]</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ajouter">Ajouter Concours</Nav.Link>
            <Nav.Link as={Link} to="/list">Liste Concours</Nav.Link>
            <Nav.Link as={Link} to="/ajouter"> Stage </Nav.Link>
            <Nav.Link as={Link} to="/list">AAAAA</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
