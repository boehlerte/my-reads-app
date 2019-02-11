import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

export default class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    changeShelf = (event, book) => {
        const shelf = event.target.value;

        BooksAPI.update(book, shelf)
            .then(res => {
                this.props.onShelfChange();
            })
    }

    render() {
        const { book } = this.props;
        const shelf = book.shelf || 'none';

        return (
            <div className='book-container'>
                <div className='book'>
                    <div className='book-image'>
                        <img src={book.imageLinks.thumbnail} alt={book.name} />
                    </div>
                    <div className='book-status-dropdown circle-icon'>
                        <select value={shelf} onChange={(event) => this.changeShelf(event, book)}>
                            <option disabled>Move to...</option>
                            <option value='currentlyReading'>Currently Reading</option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                        </select>
                    </div>
                </div>
                <div className='book-info'>
                    <div className='book-title'>{book.title}</div>
                    {book.authors && book.authors.map((author) => 
                        <div className='book-author' key={author}>{author}</div>
                    )}
                </div>
            </div>
        )
    }
}