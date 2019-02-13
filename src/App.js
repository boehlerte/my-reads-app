import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import { Route, Link } from 'react-router-dom';
import SearchPage from './SearchPage';

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
        console.log(books);
      })
  }

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className='my-reads'>
        <div className='my-reads-header'>
          <span>My Reads</span>
        </div>
        <div className='my-reads-body'>
          <Route exact path='/' render={() => (
            <div className='bookcase'>
              <div className='bookshelf bookshelf--currently-reading'>
                <div className='bookshelf-header'>Currently Reading</div>
                <BookShelf books={currentlyReading} refreshBooks={this.refreshBooks}/>
              </div>
              <div className='bookshelf bookshelf--want-to-read'>
                <div className='bookshelf-header'>Want To Read</div>
                <BookShelf books={wantToRead} refreshBooks={this.refreshBooks}/>
              </div>
              <div className='bookshelf bookshelf--read'>
                <div className='bookshelf-header'>Read</div>
                <BookShelf books={read} refreshBooks={this.refreshBooks}/>
              </div>
            </div>
          )} />

          <Route path='/search' render={() => (
            <SearchPage shelvedBooks={books} refreshBooks={this.refreshBooks}/>
          )} />

          <Link 
            to='/search'
            className='add-book-icon circle-icon'
          ></Link>
        </div>
      </div>
    );
  }
}

export default App;
