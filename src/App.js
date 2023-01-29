
import {Routes,Route} from "react-router-dom";
import NavBar from './components/navbar';
import HomePage from './pages/homepage';

import DetailBook from "./pages/detailbook";
import AddBook from '../src/pages/addbook';
import BookListing from "./pages/booklisting";
import Test from '../src/pages/testing';
import Footer from "./pages/footer";
import UpdateBook from "./pages/updatebook";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path='/listbooks' element={<BookListing />} />
        <Route path='/aboutus' element={<Test/>} />
        <Route path='/detailbook/:id' element={<DetailBook />}/>
        <Route path='/addbook' element={<AddBook />}/>
        <Route path="/updatebook/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
