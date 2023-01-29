import { Container, Row, Col,  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector} from 'react-redux';
import { Rate } from 'antd';
import React  from 'react'; 
import { getAllBooks } from '../feature/books/bookSlice';
import '../css/card.css';
import '../css/popup.css'
import placeholderImg from '../img/placeholder.jpg';

function ListBooks() {
  const books = useSelector(getAllBooks);
  
  
  return (
    <Container className='mt-2'>
      {
        books.length === 0
          ? <div className='popup'><div className='loading'></div></div>
          : <Row xs={1} sm={2} md={2} lg={2} xl={4} xxl={4} >
            {

              books.map((book) => (
                <Col className=' px-1 mt-1' key={book.id}>
                  <LinkContainer to={'/detailbook/'+ book.id}  >
                    <div className='card-items'>
                      <div className='img-box'>
                          <img src={book?.attributes?.thumbnail?.data?.attributes?.url != null ?"https://cms.istad.co" + book?.attributes?.thumbnail?.data?.attributes?.url: placeholderImg } alt='error'/>
                      </div>
                      <div className='txt-box'>
                        <h4 >{book?.attributes?.title}</h4>
                        <p>{book?.attributes?.description}</p>
                        <h5>$ {book?.attributes?.price}</h5>
                        <Rate className='rate' defaultValue={book.attributes.star_review} disabled/>
                        <h6>By : {book?.attributes?.ib_author?.data?.attributes?.name ?? "None"}</h6>
                      </div>
                    </div>
                  </LinkContainer>
                </Col>
              ))
            }
          </Row>
      }
    </Container>
  )
}

export default ListBooks;

//   <Row xs={1} sm={2} md={2} lg={2} xl={4} xxl={4} >
  // <Col className='card-items'>
  //   <LinkContainer to={'/detailbook'}>
  //     <Card >
  //       <Card.Img variant="top" src="holder.js/100px180" />
  //       <Card.Body>
  //         <Card.Title>Card Title</Card.Title>
  //         <Card.Text style={{
  //           lineHeight: "1.3rem", fontWeight: "400", maxHeight: "6rem",
  //           overflow: "hidden", display: "-webkit-box", textOverflow: "ellipsis",
  //           whiteSpace: "normal", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
  //           msTextOverflow: "ellipsis",
  //         }}>
  //           Some quick example text to build on the card title and make up the
  //           bulk of the card's content.aaaaaaaaaaaaaaa aaa
  //         </Card.Text>
  //         <Card.Subtitle className='pb-1'>
  //           publishedAt:
  //         </Card.Subtitle>
  //         <Card.Footer> Author:</Card.Footer>
  //       </Card.Body>
  //     </Card>
  //   </LinkContainer>
  // </Col>

// </Row>
// 