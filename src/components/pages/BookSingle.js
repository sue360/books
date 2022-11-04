//Imports 
import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

//Custom Imports
import Home from './Home'

const BookSingle = (props) => {
  console.log(props)
  // ! State
  // set book object to null so that it doesn't retrun truthy in return
  const [ book, setBook ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ description, setDescription ] = useState('')
  const [ subjects, setSubjects ] = useState([])
  const [ randomWorks, setRandomWorks ] = useState([])


  // ! Location 
  const { bookId } = useParams()
  const { subject } = useParams()
  const location = useLocation()

  // ! Execution
  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(`http://openlibrary.org/works/${bookId}.json`)
        setBook(data)
        getDescription(data)
        getSubjects(data)
        console.log('BookSingle props:', subject)
      } catch (err) {
        console.log(err)
        setErrors(err.message)
      }
    }
    getBook()
  }, [bookId, subject])

  const getDescription = (book) => {
    const description = book.description
    if (typeof book.description === 'object') {
      setDescription(book.description.value) 
      
    } else {
      setDescription(book.description) 
    } 
    
  }

  const getSubjects = (book) => {
    let subjectArray = book.subjects
    // randomise subjects each time??
    subjectArray = subjectArray.slice(0,10).map(subject => {
      return (`${subject} | `)
    })
    setSubjects(subjectArray) 
  }

  // ! JSX
  return (
    <main className="single-page">  
      <Container>
        <Row>
          {/* if theres book data then show it */}
          { book ? 
            <>
              <Col>
                <div className="book-image mt-4" style={{ backgroundImage: `url(https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg)` }}></div>
              </Col>
              <Col className="mt-4">
                <h1>{book.title}</h1>
                <p>{description}</p>
                {/* Make into list? */}
                <h4>Subjects</h4>
                <p>{subjects}</p>
                <h2>{}</h2>
                <Link to={`/books/${subject}`} className='btn btn-main'>Back to Books</Link>
              </Col>
            </>
            // Else show an error else show loading...
            :
            errors ? <h2>{errors}</h2> : <h2>Loading...</h2> 
          }
        </Row>
      </Container>
    </main>
  )


}

export default BookSingle