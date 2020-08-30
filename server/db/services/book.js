const faker = require('faker');
const Book = require('../models/book');

module.exports = {
  create: async (data = {}) => {
    try {
      const newBook = new Book({
        name: data.name || faker.name.firstName(),
        text: data.text || faker.lorem.paragraph(5),
        price: data.price || faker.finance.amount(0, 10000),
        sellerId: data.sellerId || faker.random.uuid(),
      });

      await newBook.save();
      return newBook;
    } catch (e) {
      return e;
    }
  },
  readAll: async () => {
    try {
      const books = await Book.find({});
      return books;
    } catch (e) {
      return e;
    }
  },
};
