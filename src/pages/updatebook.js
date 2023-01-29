import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import '../css/addbook.css';
import { fetchAsyncAuthors, getAllAuthors, getAllBooks, putAsyncBooks, onLoadingStatus, onReload } from '../feature/books/bookSlice';
function UpdateBook() {
    const books = useSelector(getAllBooks);
    const isLoading = useSelector(onLoadingStatus);
   
    const { id } = useParams();
    console.log(id);
    const [data, setData] = useState({
        id: null,
        code:'',
        title: '',
        price: null,
        des: '',
        starReview: null,
        ib_author: null,
        thumbnail : ''
    });

    const ratingChanged = (newRating) => {
        console.log(newRating);
        data.starReview = newRating;
        console.log(data.starReview);
    };

    //validation form
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            dispatch(putAsyncBooks(data,id.toString()));
        }


        setValidated(true);
    };
    const handleChange = (e) => {
        setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const dispatch = useDispatch();
    const authors = useSelector(getAllAuthors);
    useEffect(() => {
        if (id != null) {

            for (let i = 0; i < books.length; i++) {
                
                if (books[i].id == id) {
                    setData({
                        id:books[i]?.id,
                        code : books[i]?.attributes?.code,
                        title: books[i]?.attributes?.title,
                        price:books[i]?.attributes?.price,
                        des: books[i]?.attributes?.description,
                        starReview: books[i]?.attributes?.star_review,
                        ib_author: books[i]?.attributes?.ib_author?.data?.id,
                        thumbnail : books[i]?.attributes?.thumbnail?.data?.id
                    });
                    
                }
            }
        }
        dispatch(fetchAsyncAuthors());
        

    }, [dispatch, books]);
    console.log(data.starReview,data.ib_author,data.code,data.thumbnail,data.price);
    return (
        <Container>
            <h1 className='my-5 d-flex justify-content-center title' >UPDATE BOOK</h1>
            <Form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>title</Form.Label>
                        <Form.Control type="text" name='title' value={data?.title ?? ''} placeholder="Enter title" onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">
                            Please input title.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label>price</Form.Label>
                        <Form.Control type="text" placeholder="price" value={data?.price ?? ''} name='price' onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">
                            Please input price.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="validationCustom03">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name='des' value={data?.des ?? ''} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please input description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} className='text-center mx-0'>
                    <Form.Group as={Col} className="mb-0 ">
                        <Form.Label className="mb-0 ">Star Review</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <div className='star-rating'>
                            <ReactStars
                                count={5}
                                value={data.starReview == null ? 3 : data.starReview}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={false}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </div>
                    </Form.Group>
                </Row>
                <Form.Group className="mt-3 " controlId="validationCustom04">
                    <Form.Control as="select" type="select" name='ib_author' value={data?.ib_author ?? ''} onChange={handleChange} required>
                        <option value=''>Select Author</option>
                        {
                            authors.map((author) => (
                                <option value={author.id} key={author.id}>{author.attributes.name}</option>
                            ))
                        }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please Select Author.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='text-center mt-3'>
                    <Button variant='success' type='submit' disabled={isLoading} >{isLoading ? 'Loading…' : 'SAVE'}</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default UpdateBook;

// const addBook = async () => {
//     try {
//         const request = await fetch(
//             'https://cms.istad.co/api/ib-books',
//             {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     "data": {
//                         "code": "IB-" + Math.floor((Math.random() * 10000) + 1),
//                         "title": title,
//                         "description": des,
//                         "price": parseInt(price,10),
//                         "star_review": starReview,
//                         "originally_published": "2022-11-26",
//                         "ib_author": "7",
//                         "pdf_link": "none",
//                         "isEnabled": true,
//                         "thumbnail": "631"
//                     }
//                 }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }

//             }
//         );
//         const response = await request.json();
//         console.log(response);

//     } catch (error) {
//         console.log(error);
//     }

// }
