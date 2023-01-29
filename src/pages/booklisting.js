import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { fetchAsyncBooks } from '../feature/books/bookSlice';
import ListBooks from './listbooks';

function BookListing() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAsyncBooks());
    }, [dispatch]);

    return (
      <ListBooks />
    )
  }
export default BookListing;