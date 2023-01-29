import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { getAllBooks,deleteAsyncBook,onLoadingStatus } from '../feature/books/bookSlice';
import { useParams } from 'react-router-dom';
import '../css/detailbox.css';
import placeholderImg from '../img/placeholder.jpg';
import { Rate } from 'antd';
function DetailBook() {
  const books = useSelector(getAllBooks);
  const isLoading = useSelector(onLoadingStatus);
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(id);

  const [book, setBook] = useState({});

  useEffect(() => {
    if (id != null) {

      for (let i = 0; i < books.length; i++) {
        console.log(books[i].id, id);
        if (books[i].id == id) {
          setBook(books[i]);
          console.log(books[i]);
        }
      }
    }

  }, [books]);
 
  console.log(book);
  const handleClick = () => dispatch(deleteAsyncBook(id.toString()));
  return (
    <>
      <Container className='content-box'>
        <Row >
          <Col xs={12} sm={12} md={5} lg={4} xl={4} xxl={4} className='photo-box'>
            <div className='img-box'>
              <img src={book?.attributes?.thumbnail?.data?.attributes?.url != null ? "https://cms.istad.co" + book?.attributes?.thumbnail?.data?.attributes?.url : placeholderImg} alt='error' />
            </div>
          </Col>
          <Col className='detail-box'>
            <h1 >{book?.attributes?.title}</h1>
            <div >
              <p>
                Code : {book?.attributes?.code}
                <span className='p-box'> Price : {book?.attributes?.price}$</span>
                PublicAt :{book?.attributes?.originally_published}
              </p>
            </div>
            <Rate value={book?.attributes?.star_review} disabled />
            <div className='author-box'>
              Author : {book?.attributes?.ib_author?.data?.attributes?.name}
            </div>
            <div className='des-box'>
              <p>
                description :{book?.attributes?.description}
              </p>
            </div>
          </Col>
        </Row>
        <div className='btn-box '>
          <LinkContainer className='b' to={'/updatebook/'+id} ><Button  variant='info'>EDIT</Button></LinkContainer>
          <LinkContainer to={'/listbooks'}><Button variant='danger' onClick={!isLoading ? handleClick : null} disabled={isLoading} >{isLoading ? 'Loading…' : 'DELETE'}</Button></LinkContainer>
        </div>
      </Container>

    </>
  )

}
export default DetailBook;