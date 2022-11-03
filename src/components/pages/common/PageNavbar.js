import { Link, useNavigate } from 'react-router-dom'

//Bootstrap Component
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

const PageNavbar = () => {

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">📚</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'></Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/books">Books Index</Nav.Link>
          {/* <Nav.Link as={Link} to="/:bookId">BookSingle</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default PageNavbar