import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export default class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        refreshBooks: PropTypes.func.isRequired
    }

    render() {
        const { books, refreshBooks } = this.props;
        return (
            <div>
                <div className='bookshelf-container'>
                    {books.map(book => (
                        <Book key={book.id} book={book} onShelfChange={refreshBooks}/>
                    ))}
                </div>
            </div>
        )
    }
}