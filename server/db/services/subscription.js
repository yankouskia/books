const Subscription = require('../models/subscription');

module.exports = {
  start: async data => {
    try {
      const newSubscription = new Subscription({
        userId: data.userId,
        bookId: data.bookId,
        active: true,
      });

      await newSubscription.save();
      return newSubscription;
    } catch (e) {
      return Error('Subscription was not created');
    }
  },
  end: async data => {
    try {
      const subscription = await Subscription.findOne({
        userId: data.userId,
        bookId: data.bookId,
        active: true,
      });

      if (!subscription) throw new Error();

      subscription.active = false;
      await subscription.save();

      return subscription;
    } catch (e) {
      return Error('Subscription was not found');
    }
  },
};
