import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


function AboutUs() {
  const [data, setData] = useState({
    title: '',
    price: null,
    des: '',
    starReview: null
  });
  const [starReview, setStarReview] = useState(3);
  const addBook = async () => {

    try {
      const request = await fetch(
        'https://cms.istad.co/api/ib-books',
        {
          method: 'POST',
          body: JSON.stringify({
            "data": {
              "code": "IB-" + Math.floor((Math.random() * 10000) + 1),
              "title": data.title,
              "description": data.des,
              "price": data.price,
              "star_review": starReview,
              "originally_published": "2022-11-26",
              "ib_author": "7",
              "pdf_link": "none",
              "isEnabled": true,
              "thumbnail": "631"
            }
          }),
          headers: {
            "Content-Type": "application/json"
          }

        }
      );
      const response = await request.json();
      console.log(response);

    } catch (error) {
      console.log(error);
    }

  }
  console.log("asd",data.title);
  return (
    <>
      <div>AboutUs</div>
      <Button onClick={addBook}>
        save
      </Button>
      <input   name='title' onChange={(e) => setData({...data,[e.target.name]:e.target.value})}/>
    </>
  )
}

export default AboutUs