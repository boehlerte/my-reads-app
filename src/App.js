import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import { Route, Link } from 'react-router-dom';
import SearchPage from './SearchPage';

const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
}

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
    
    return (
      <div className='my-reads'>
        <div className='my-reads-header'>
          <span>My Reads</span>
        </div>
        <div className='my-reads-body'>
          <Route exact path='/' render={() => (
            <div className='bookcase'>
              {Object.keys(shelves).map((shelf) => 
                <BookShelf 
                  key={shelf}
                  shelf={shelves[shelf][1]} 
                  title={shelves[shelf][0]}
                  books={this.state.books}
                  refreshBooks={this.refreshBooks}
                />
              )}
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
