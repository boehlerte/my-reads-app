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
        if (query) {
            BooksAPI.search(query)
            .then(books => {
                this.setState({
                    booksReturned: books
                })
                console.log(this.state.booksReturned);
            })
            .catch(error => {
                console.log('no books matching that search query')
            })
        } else {
            this.setState({
                booksReturned: []
            })
        }
    }

    render() {
        const { searchQuery, booksReturned } = this.state;
        const { refreshBooks } = this.props;

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
                    {
                        booksReturned && booksReturned.length > 0 && 
                        booksReturned.map(book => 
                            <Book key={book.id} book={book} onShelfChange={refreshBooks} />
                        )
                    }
                </div>
            </div>
            

        )
    }
}