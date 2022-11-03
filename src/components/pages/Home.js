//React components 
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  // ! State
  const [ subject, setSubject ] = useState('')

  // ! Executions 
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setSubject(e.target.value)
  }


  return (
    <main className='hero-page text-center'>
      <div className='hero'>
        <h1 className='display-3'>📚 Library 📚</h1>
        <p className='lead'>Type in a subject to get books!</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="subject" onChange={handleChange} placeholder="Type book subject here..."/>
          <Link to={`/books/${subject}`}className='btn btn-main'>Discover Books</Link>
        </form>
      </div>
    </main>
  )
}

export default Home