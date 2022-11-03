// Imports
import { useState, useEffect } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

//Imports from React
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import BookSingle from './BookSingle'

const BookIndex = () => {
// ! State 
  const [ books, setBooks ] = useState([])
  const [ works, setWorks ] = useState([])

  // ! Exectution
  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios.get('http://openlibrary.org/subjects/science.json')
        setBooks(data)
        const { works } = data
        setWorks(works)
      } catch (err) {
        console.log(err)
      }
    }
    getBooks()
  }, [])


  //! JSX
  return (
    <main className="index-page">
      <Container className='mt-4'>
        <h1>Book Index</h1>
        <Row>
          {works.map( work => {
            // Deconstruct keys from work object
            const { title, key, authors, cover_id, first_publish_year } = work
            // Isolate actual id value from key
            const keyId = key.slice(7,key.length)
            // Get authors name from authors array
            const authorName = authors[0].name
            return (
              <Col key={keyId}md="6" lg="4" mb="4" className='book-card mb-4'>
                <Link to={`/books/${keyId}`}>
                  <Card className='mb-4'>
                    <div className="card-image" style={{ backgroundImage: `url(https://covers.openlibrary.org/b/id/${cover_id}-M.jpg)` }}></div>
                    <Card.Body>
                      <Card.Title className='mb-0'>{title} - {authorName} - {first_publish_year}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })
          
          }
          
        </Row>
      </Container>
    </main>
  )

}

export default BookIndex