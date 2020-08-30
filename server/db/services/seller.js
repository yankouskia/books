const faker = require('faker');
const Seller = require('../models/seller');

module.exports = {
  create: async (data = {}) => {
    try {
      const newSeller = new Seller({
        token: data.token || faker.random.uuid(),
        name: data.name || faker.name.firstName(),
      });

      await newSeller.save();
      return newSeller;
    } catch (e) {
      return e;
    }
  },
  getByToken: async token => {
    try {
      const seller = await Seller.findOne({ token });
      return seller._id;
    } catch (e) {
      return e;
    }
  },
  readAll: async () => {
    try {
      const sellers = await Seller.find({});
      return sellers;
    } catch (e) {
      return e;
    }
  },
};
