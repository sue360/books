import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Import components 
import PageNavbar from './components/pages/common/PageNavbar'
import Home from './components/pages/Home'
import BookIndex from './components/pages/BookIndex'
import BookSingle from './components/pages/BookSingle'


const App = () => {
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<BookIndex />}></Route>
          <Route path="/books/:bookId" element={<BookSingle />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App