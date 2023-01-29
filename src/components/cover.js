import React from 'react'
import background from '../img/living-room-product-backdrop-interior-background.jpg';
import book from '../img/book.webp';
import '../index.css';
function Cover() {
  return (
    <div className='home-content'>
      <img src={background} alt='error' />
      <div className='txt-box'>
        <h1>Welcome to BookStore!!</h1>
        <p>this website develop with API</p>
        <img src={book} alt='erorr' />
      </div>
    </div>
  )
}

export default Cover;