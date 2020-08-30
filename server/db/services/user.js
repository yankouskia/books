const faker = require('faker');
const User = require('../models/user');
const Subscription = require('../models/subscription');

module.exports = {
  findOrCreate: async oAuthData => {
    try {
      const user = await User.findOne({ authId: oAuthData.id });

      if (!user) {
        const newUser = new User({
          authId: oAuthData.id,
          email: oAuthData.email || `${faker.name.firstName()}.${faker.name.lastName()}@gmail.com`,
          fullname: oAuthData.displayName || `${faker.name.firstName()}.${faker.name.lastName()}`,
        });

        await newUser.save();
        return newUser;
      }

      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findByAuthId: async id => {
    const user = await User.findOne({ authId: id });

    const jsonUser = user.toJSON();
    const subscriptions = await Subscription.find({ active: true, userId: jsonUser._id });
    jsonUser.subscriptions = subscriptions;

    return jsonUser;
  },
};
