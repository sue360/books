//React components 
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookSingle from './BookSingle'

const Home = () => {

  // ! State
  const [ subject, setSubject ] = useState('')

  // ! Executions 
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    let input = e.target.value
    if (input.includes(' ')) {
      input = input.replace(' ', '-')
    }
    setSubject(input)
  }


  return (
    <main className='hero-page text-center'>
      <div className='hero'>
        <h1 className='display-3'> Alexandria </h1>
        <p className='lead'>Type in a subject to get a selection of books</p>
        <form onSubmit={handleSubmit}>
          <input required type="text" name="subject" onChange={handleChange} placeholder="Type book subject here..."/>
          { subject ?
            <>
              <Link to={`/books/${subject}`}className='btn btn-main'>Discover Books</Link>
            </>
            :
            <>
              <Link to={'/'}className='btn btn-main'>Discover Books</Link>
            </>
          }
        </form>
      </div>
    </main>
  )
}

export default Home