//Imports 
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

//Custom Imports

const BookSingle = () => {
  // ! State
  // set book object to null so that it doesn't retrun truthy in return
  const [ book, setBook ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ description, setDescription ] = useState('')
  const [ subjects, setSubjects ] = useState([])
  // const [ authorName, setAuthorName ] = useEffect('')


  // ! Location 
  const { bookId } = useParams()

  // ! Execution
  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(`http://openlibrary.org/works/${bookId}.json`)
        setBook(data)
        getDescription(data)
        getSubjects(data)
      } catch (err) {
        console.log(err)
        setErrors(err.message)
      }
    }
    getBook()
  }, [bookId])

  const getDescription = (book) => {
    const description = book.description
    if (typeof book.description === 'object') {
      setDescription(book.description.value) 
      
    } else {
      setDescription(book.description) 
    } 
    //else {
    //   setDescription('No description available 😿 ')
    // }
    
  }

  const getAuthorName = (props) => {
    const { author } = props
    console.log(author)
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
                <Link to={'/books/:subject'} className='btn btn-main'>Back to Books</Link>
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