const { Book } = require('../models/book.models');

class BookServices {
  static async showBookInfo(idBook) {
    await Book.updateViews(idBook);
    const results = await Book.getBookInfo(idBook);
    if(!results[0][0]) throw new Error('Khong tim thay');
    const book = results[0][0];
    const bookSameCategories = results[1];
    const bookSamePublishers = results[2];
    return {book, bookSameCategories, bookSamePublishers};
  }

  static async showBookWithPrice(currentPage, priceStart, priceEnd) {
    const books = await Book.getAllCategoryAuthorPublisher();
    const categories = books[0];
    const authors = books[1];
    const publishers = books[2];
    if(!categories && !publishers && !authors) throw new Error('Khong tim thay');

    const items = await Book.getBookWithPrice(currentPage, priceStart, priceEnd);
    if(!items[0] && !items[1]) throw new Error('Khong tim thay');
    const count = Math.ceil(items[0][0].count / 8);
    return {categories, authors, publishers, items: items[1], count, length: items[0][0].count };
  }

  static async showBookWithName(currentPage, nameSearch) {
    const books = await Book.getAllCategoryAuthorPublisher();
    const categories = books[0];
    const authors = books[1];
    const publishers = books[2];
    if(!categories && !publishers && !authors) throw new Error('Khong tim thay');

    const items = await Book.getBookWithName(currentPage, nameSearch);
    if(!items[0] && !items[1]) throw new Error('Khong tim thay');
    const count = Math.ceil(items[0][0].count / 8);
    return {categories, authors, publishers, items: items[1], count, length: items[0][0].count};
  }
}

module.exports = { BookServices };