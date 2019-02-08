import React, { Component } from 'react';
import Book from './Book';

export default class BookShelf extends Component {
    render() {
        const { books, refreshBooks } = this.props;
        return (
            <div>
                <div className="bookshelf">
                    {books.map(book => (
                        <Book key={book.id} book={book} onShelfChange={refreshBooks}/>
                    ))}
                </div>
            </div>
        )
    }
}