import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NutritionNav({ isAuth, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Nutrition4U</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {isAuth && (
            <>
              <Nav.Link href="/add-food">Add Food</Nav.Link>
              <Nav.Link href="/my-foods">My Foods</Nav.Link>
              <Nav.Link onClick={onLogout}>Log Out</Nav.Link>
            </>
          )}
          {!isAuth && (
            <>
              <Nav.Link href="/sign-up">Signup</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
