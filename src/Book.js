import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

export default class Book extends Component {
    changeShelf = (event, book) => {
        BooksAPI.update(book, event.target.value)
            .then(res => {
                this.props.onShelfChange();
            })
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-image">
                    <img src={book.imageLinks.thumbnail} alt={book.name} />
                </div>
                <div className="book-status-dropdown">
                    <select value={book.shelf} onChange={(event) => this.changeShelf(event, book)}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        )
    }
}