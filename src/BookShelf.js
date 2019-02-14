import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export default class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        refreshBooks: PropTypes.func.isRequired
    }

    render() {
        const { shelf, title, books, refreshBooks } = this.props;
        return (
            <div className='bookshelf'>
                <div className='bookshelf-header'>
                    {title}
                </div>
                <div className='bookshelf-books'>
                    {books.filter(book => book.shelf === shelf).map(book => (
                        <Book key={book.id} book={book} onShelfChange={refreshBooks}/>
                    ))}
                </div>
            </div>
        )
    }
}