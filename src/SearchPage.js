import React, { Component } from 'react';
import arrowBack from './icons/arrow-back.svg';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class SearchPage extends Component {
    state = {
        searchQuery: '',
        booksReturned: []
    }

    updateQuery = (query) => {
        this.setState({
            searchQuery: query
        })
        BooksAPI.search(query)
            .then(books => {
                this.setState({
                    booksReturned: books
                })
                console.log(this.state.booksReturned)
            })
    }

    render() {
        const { searchQuery, booksReturned } = this.state;

        return (
            <div className='search-page'>
                <div className='search-bar'>
                    <Link to='/'>
                        <img className='back-arrow' src={arrowBack} alt='go back'/>
                    </Link>
                    <input 
                        className='search-books' 
                        type='text' 
                        placeholder='Search Books'
                        value={searchQuery}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <div className='search-results'>
                    {booksReturned.length > 0 && booksReturned.map(book => <Book key={book.id} book={book}/>)}
                </div>
            </div>
            

        )
    }
}