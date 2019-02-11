import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

export default class Book extends Component {
    _isMounted = false;

    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    state = {
        currentShelf: 'none'
    }

    changeShelf = (book, shelf) => {
        if (this._isMounted) {
            BooksAPI.update(book, shelf)
                .then(res => {
                    this.setState({
                        currentShelf: shelf
                    })
                    this.props.onShelfChange();
                })
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        BooksAPI.get(this.props.book.id) 
            .then(book => {
                this.setState({
                    currentShelf: book.shelf || 'none'
                })
            })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        const { currentShelf } = this.state;
        const { book } = this.props;

        return (
            <div className='book-container'>
                <div className='book'>
                    <div className='book-image'>
                        {book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.name} />}
                        {!book.imageLinks && <div className='missing-thumbnail'>No Image</div>}
                    </div>
                    <div className='book-status-dropdown circle-icon'>
                        <select value={currentShelf} onChange={(event) => this.changeShelf(book, event.target.value)}>
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