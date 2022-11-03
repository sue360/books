import { Link, useNavigate } from 'react-router-dom'

//Bootstrap Component
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

//Import custom components 
import BookIndex from '../../pages/BookIndex'

const PageNavbar = () => {

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">📚</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'></Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/books/:subject">Books Index</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default PageNavbar