import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Navbar expand="sm" variant="dark" bg={"dark"}>
        <Navbar.Brand to="/" as={Link}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto" navbar>
            <Nav.Link exact as={NavLink} to="/acceptProposal">
              {" "}
              Accetta proposta di locazione{" "}
            </Nav.Link>
            <Nav.Link exact as={NavLink} to="/verifyMember">
              {" "}
              Verifica persona{" "}
            </Nav.Link>
            <Nav.Link exact as={NavLink} to="/proposals">
              {" "}
              Proposte di locazione{" "}
            </Nav.Link>
            <Nav.Link exact as={NavLink} to="/registerRealEstate">
              {" "}
              Registra immobile{" "}
            </Nav.Link>
            <Nav.Link exact as={NavLink} to="/sendProposal">
              {" "}
              Invia proposta di locazione{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
