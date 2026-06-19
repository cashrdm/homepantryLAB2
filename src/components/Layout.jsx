import { Outlet, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { usePantry } from "../context/PantryContext.jsx";

function Layout() {
  const { products } = usePantry();

  // Liczba produktów z datą ważności wcześniejszą niż dzisiaj
  const dzisiaj = new Date().toISOString().slice(0, 10);
  const przeterminowane = products.filter((p) => p.expiryDate < dzisiaj).length;

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            🏠 HomePantry
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Spiżarnia
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add">
                Dodaj
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Kategorie
              </Nav.Link>
              <Nav.Link as={NavLink} to="/settings">
                Ustawienia
              </Nav.Link>
            </Nav>
            <Navbar.Text>
              Przeterminowane:{" "}
              <Badge bg={przeterminowane > 0 ? "danger" : "secondary"}>
                {przeterminowane}
              </Badge>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;