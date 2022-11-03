//React components 
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className='hero-page text-center'>
      <div className='hero'>
        <h1 className='display-3'>📚 Library 📚</h1>
        <p className='lead'>Type in a subject to get books!</p>
        <Link to="/books" className='btn btn-main'>Discover Books</Link>
      </div>
    </main>
  )
  
}

export default Home