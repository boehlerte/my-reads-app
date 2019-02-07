import React, { Component } from 'react';

export default class BookShelf extends Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.books.map(book => (
                        <span className="book" key={book.id}>
                            <img src={book.imageLinks.thumbnail} alt={book.title}/>
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}