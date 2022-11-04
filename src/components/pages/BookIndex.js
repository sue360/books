// Imports
import { useState, useEffect, useCallback } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

//Imports from React
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { setSelection } from '../helpers/BookSelection'
import { getSelection } from '../helpers/BookSelection'

const BookIndex = () => {
// ! State 
  const [ works, setWorks ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ randomSelection, setRandomSelection ] = useState([])
  const [ randomWorks, setRandomWorks ] = useState([])

  // ! Location Variables
  const { subject } = useParams()

  // ! Exectution
  const generateRandomSelection = () => {
    const randomNumbers = []
    while (randomNumbers.length < 54) {
      let number = Math.floor(Math.random() * 200)
      if (randomNumbers.includes(number)) {
        number = Math.floor(Math.random() * 200)
      }
      randomNumbers.push(number)
      
    }
    setSelection(randomNumbers)
    setRandomSelection(getSelection() ? getSelection() : randomNumbers)
  }

  const getRandomWorks = useCallback(() => {
    const randomWorkSelection = randomSelection.map(num => {
      return works[num]
    }) 
    setRandomWorks(randomWorkSelection)
  }, [ works, randomSelection ]) 



  useEffect(() => {
    const getBooks = async () => {
      generateRandomSelection()
      try {
        const { data } = await axios.get(`http://openlibrary.org/subjects/${subject}.json?limit=200`)
        const { works } = data
        setWorks(works)
        console.log(data.works.length)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getBooks()
  }, [subject])

  useEffect(() => {
    if (works.length) {
      getRandomWorks()
    }
  }, [works, getRandomWorks])

  

  //! JSX
  return (
    <main className="index-page">
      <Container className='mt-4'>
        <h1>Showing books with subject : <span>{`${subject} `}</span> </h1>
        <Row>
          { randomWorks.length ?
            randomWorks.map( work => {
              // Deconstruct keys from work object
              // const {  title, key, authors, cover_id, first_publish_year } = work 
              const title = work.title ? work.title : 'Undefined'
              const key = work.key ? work.key : 'Undefined'
              const authors = work.authors ? work.authors : 'Undefined'
              const cover_id = work.cover_id ? work.cover_id : 'Undefined'
              const first_publish_year = work.first_publish_year ? work.first_publish_year : 'Undefined'
              // Isolate actual id value from key
              const keyId = key.slice(7,key.length) 
              // Get authors name from authors array
              const authorName = authors[0] ? authors[0].name : 'Undefined'
              return (
                <Col key={keyId}md="6" lg="4" mb="4" className='book-card mb-4'>
                  <Link subject={subject} to={{ pathname: `/books/${subject}/${keyId}`, state: { works: true } }}>
                    <Card className='mb-1'>
                      <div className="card-image" style={{ backgroundImage: `url(https://covers.openlibrary.org/b/id/${cover_id}-M.jpg)` }}></div>
                      <Card.Body>
                        <Card.Title className='mb-0'>{title}</Card.Title>
                        <p>{authorName}</p>
                        {/* {console.log(authorName)} */}
                        <p><em>{first_publish_year}</em></p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })
            :
            errors ? <h2>Hmmmmm, looks like theres an error{errors}</h2> : 
              <>
                <Col className='loading-card mb-4'>
                  <Card className='mb-1'>
                    <Card.Body>
                      <div className='card-image'></div>
                      <Card.Title className='mb-0'><p>Loading your books...</p></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                
              </>
          }
        </Row>
      </Container>
    </main>
  )

}

export default BookIndex