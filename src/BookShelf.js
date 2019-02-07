import React, { Component } from 'react';
import Book from './Book';

export default class BookShelf extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    {this.props.books.map(book => (
                        <Book key={book.id} book={book}/>
                    ))}
                </div>
            </div>
        )
    }
}