import React, { Component } from 'react';

export default class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-image">
                    <img src={this.props.book.imageLinks.thumbnail} alt={Book.name} />
                </div>
                <div className="book-dropdown">
                    <select>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                    </select>
                </div>
            </div>
        )
    }
}