import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //Create checkout session
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["DE"],
        },
        shipping_options: [
          { shipping_rate: "shr_1MHqN0JinpQRfOMjEbNaE9eQ" },
          { shipping_rate: "shr_1MHqYpJinpQRfOMjRFHMQyad" },
        ],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.Title,
                images: [item.Image.data[0].attributes.formats.small.url],
              },
              unit_amount: item.Price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        // Success or failure page
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
