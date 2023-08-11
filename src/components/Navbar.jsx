import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar  data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Kasir</Navbar.Brand>
          <Nav className="me-auto">
           
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;