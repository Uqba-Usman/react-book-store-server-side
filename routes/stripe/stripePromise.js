const stripe = require("stripe")("sk_test_GeWafWg2bbLwk6mL5ZVcRuPf00YjfTKdKL");
const { uuid } = require("uuidv4");

const stripePromise = (product, token) => {
  new Promise((resolve, reject) => {
    const idempotencyKey = uuid();
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        console.log("Customer", customer);

        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,

            description: "My book Description",

            shipping: {
              name: token.card.name,
              address: {
                line1: "",
                country: token.card.address_country,
              },
            },
          },
          { idempotencyKey }
        );
      })
      .then((result) => {
        console.log("Result", result);
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports.stripePromise = stripePromise;
