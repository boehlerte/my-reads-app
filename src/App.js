import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.refreshBooks();
  }

  refreshBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className="my-reads">
        <header className="my-reads-header">
          <h2>My Reads</h2>
        </header>
        <div className="my-reads-body">
          <div className="bookshelf bookshelf--currently-reading">
            <h4>Currently Reading</h4>
            <BookShelf books={currentlyReading} refreshBooks={this.refreshBooks}/>
          </div>
          <div className="bookshelf bookshelf--want-to-read">
            <h4>Want To Read</h4>
            <BookShelf books={wantToRead} refreshBooks={this.refreshBooks}/>
          </div>
          <div className="bookshelf bookshelf--read">
            <h4>Read</h4>
            <BookShelf books={read} refreshBooks={this.refreshBooks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
