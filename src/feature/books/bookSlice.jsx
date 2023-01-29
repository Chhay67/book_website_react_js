import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAsyncBooks = createAsyncThunk(
    'books/fetchAsyncBooks',
    async () => {
        const response = await fetch('https://cms.istad.co/api/ib-books?populate=%2A');
        const listBooks = await response.json();
        console.log(listBooks.data);
        return listBooks.data;

    });
export const deleteAsyncBook = createAsyncThunk(
    'books/deleteAsyncBook',
    async (id) => {
        const response = await fetch('https://cms.istad.co/api/ib-books/'+id,{
            method: 'DELETE',
        }).then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
);
export const fetchAsyncAuthors = createAsyncThunk(
    'authors/fetchAsyncAuthors',
    async () => {
        const response = await fetch('https://cms.istad.co/api/ib-authors');
        const listAuthors = await response.json();
        console.log(listAuthors.data);
        return listAuthors.data;

    }
);
export const postAsyncBooks = createAsyncThunk(
    'books/postAsyncBooks',
    async (data) => {
        const d = data;
        const request = await fetch(
            'https://cms.istad.co/api/ib-books',
            {
                method: 'POST',
                body: JSON.stringify({
                    "data": {
                        "code": "IB-" + Math.floor((Math.random() * 10000) + 1),
                        "title": d.title,
                        "description": d.des,
                        "price": parseInt(d.price),
                        "star_review": d.starReview,
                        "originally_published": "2022-11-26",
                        "ib_author": d.ib_author.toString(),
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
    }
);
export const putAsyncBooks = createAsyncThunk(
    'books/putAsyncBooks',
    async (data) => {
        const d = data;
        
        const request = await fetch(
            'https://cms.istad.co/api/ib-books/'+d.id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "data": {
                        "code": d.code,
                        "title": d.title,
                        "description": d.des,
                        "price": d.price,
                        "star_review": d.starReview,
                        "originally_published": "2022-11-24",
                        "ib_author": d.ib_author.toString(),
                        "pdf_link": "string",
                        "isEnabled": true,
                        "thumbnail": d.thumbnail.toString()
                      }
                }),
                headers: {
                    "Content-Type": "application/json"
                }

            }
        ).then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        const response = await request.json();
        console.log(response);
    }
)
const initialState = {
    books: [],
    authors: [],
    isLoading : false,
    isReload : null
}

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncBooks.fulfilled, (state, { payload }) => {
                console.log('fetched Successfully...');
                return { ...state, books: payload };
            })
            .addCase(fetchAsyncAuthors.fulfilled, (state, { payload }) => {
                console.log('fetched Successfully...');
                return { ...state, authors: payload };
            })
            .addCase(postAsyncBooks.pending, (state) => {
                console.log('Pending...');
                state.isLoading = true;
                
            })
            .addCase(postAsyncBooks.fulfilled, (state, { payload }) => {
                console.log('post Successfully...');
                
                return { ...state, books: payload,isLoading : false,isReload:true};
            })
            
            .addCase(putAsyncBooks.fulfilled, (state, { payload }) => {
                console.log('put Successfully...');
                return { ...state, books: payload,isLoading : false,isReload:true};
            })
            .addCase(postAsyncBooks.rejected, (state) => {
                console.log('Rejected!');
                state.isLoading = false;
                
            })
            .addCase(deleteAsyncBook.pending, (state) => {
                console.log('Pending...');
                state.isLoading = true;
                
            })
            .addCase(deleteAsyncBook.fulfilled, (state) => {
                console.log('delete Successfully...');
                state.isLoading = false;
            })
            .addCase(deleteAsyncBook.rejected, (state) => {
                console.log('Rejected!');
                state.isLoading = false;
            })
    }
});

export const { onAddBook } = bookSlice.actions;
export const getAllBooks = (state) => state.books.books;
export const getAllAuthors = (state) => state.books.authors;
export const onLoadingStatus = (state) => state.books.isLoading;
export const onReload = (state) => state.books.isReload;
export default bookSlice.reducer;

// [fetchAsyncBooks.pending]: () =>{
//     console.log('Pending...');
// },
// [fetchAsyncBooks.fulfilled]: (state,{payload}) =>{
//     console.log('fetched Successfully...');
//     return {...state,books :payload};
// },
// [fetchAsyncBooks.rejected]: () =>{
//     console.log('Rejected.');
// }