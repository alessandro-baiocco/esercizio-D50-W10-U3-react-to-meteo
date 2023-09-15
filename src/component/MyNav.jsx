import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";

const Mynav = () => {
  const [search, setSearch] = useState("");

  const ricerca = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary text-light" bg="primary">
      <Container>
        <Navbar.Brand>it's TIME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="text-light text-decoration-none mx-2 mt-2">
              Home
            </Link>

            <Link to="/ricerca" className="text-light text-decoration-none mx-2 mt-2">
              cerca
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mynav;
