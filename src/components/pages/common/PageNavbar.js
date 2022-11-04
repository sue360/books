import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

//Bootstrap Component
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

//Import custom components 
import BookIndex from '../../pages/BookIndex'

const PageNavbar = () => {
  // ! State 
  const [ bookSubject, setBookSubject ] = useState()

  // ! Location Variables
  const { subject } = useParams()

  useEffect(() =>{
    setBookSubject(subject)
    console.log(`book subject is ${subject}`)
  }, [subject])

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">📚</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'></Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default PageNavbar