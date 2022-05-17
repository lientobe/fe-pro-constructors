import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
  this.title = title;
  this.authors = authors;
  this.year = year;
  this.likedUsers = [];
  this.publicationBy = publicationBy;

  publicationBy.myBooks.push(this);
  authors.forEach(({ books }) => books.push(this));

  Object.defineProperties(this, {
    'suggestedBooks': {
      get() {
        let { authors, title: thisTitle } = this;
        return authors.reduce((accum, { books }) => {
          books.forEach(({ title }) => {
            return !accum.includes(title) && thisTitle !== title ? accum.push(title) : accum;
          });
          return accum;
        }, []).join(', ');
      }
    },
    'suggestedPublicators': {
      get() {
        let { authors, publicationBy: thisPublicationBy } = this;
        return authors.reduce((accum, { books }) => {
          books.forEach(({ publicationBy, publicationBy: { name }}) => {
            return !accum.includes(name) && thisPublicationBy !== publicationBy ? accum.push(name) : accum;
          });
          return accum;
        }, []).join(', ');
      }
    }
  });
}
