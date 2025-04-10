// paymentConfig.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, metadata = {}) => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata
  });
};

module.exports = { createPaymentIntent };