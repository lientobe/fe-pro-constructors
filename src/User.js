import { Book } from './Book.js';

/**
 * @param {string} name
 * @param {Date} date
 * @constructor
 * @property {string} name
 * @property {Date} date
 * @property {Book[]} myBooks
 * @property {User[]} friends
 * @property {Book[]} likes
 */
export function User(name, date) {
  this.name = name;
  this.date = date;
  this.myBooks = [];
  this.friends = [];
  this.likes = [];

  this.addToFriends = function(user) {
    filteredAdd(this, 'friends', user);
    filteredAdd(user, 'friends', this);
  }

  this.likeBook = function(book) {
    filteredAdd(this, 'likes', book);
    filteredAdd(book, 'likedUsers', this);
  }

  this.removeFriend = this.addToFriends;
  this.unlikeBook = this.likeBook;

  Object.defineProperties(this, {
    'friendsNames': {
      get() {
        let { friends } = this;
        return friends.map(({ name }) => name).join(', ');
      }
    },
    'likedBooks': {
      get() {
        let { likes } = this;
        return likes.map(({ title }) => title).join(', ');
      }
    },
    'publishedBooks': {
      get() {
        let { myBooks } = this;
        return myBooks.map(({ title }) => title).join(', ');
      }
    }
  });
}

function filteredAdd (object, property, element) {
  let { property } = object;
  if (property.includes(element)) {
    property = property.filter((filterElem) => filterElem !== element);
  } else {
    property.push(element);
  }
}