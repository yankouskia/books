const mongoose = require('./db/mongoose');
const book = require('./db/services/book');
const seller = require('./db/services/seller');

const SELLER_COUNT = 10;
const BOOKS_COUNT = 10;

mongoose.connection.on('open', async () => {
  await mongoose.connection.db.dropDatabase();

  const sellers = await Promise.all(
    Array.from({ length: SELLER_COUNT }).map(() =>
      seller.create().then(seller => {
        console.log('Seller is created', seller);
        return seller;
      })
    )
  );

  const booksPromises = [];
  for (let i = 0; i < sellers.length; i++) {
    for (let j = 0; j < BOOKS_COUNT; j++) {
      booksPromises.push(
        book.create({ sellerId: sellers[i]._id }).then(book => {
          console.log('Book is created', book);
          return book;
        })
      );
    }
  }

  await Promise.all(booksPromises);
  await mongoose.disconnect();
});
