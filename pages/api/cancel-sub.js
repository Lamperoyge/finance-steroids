const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function cancelSub(req, res) {
  try {
    const response = await stripe.subscriptions.del(req.body.subId);
    console.log(response.data);
    res.send(200).json({ success: true });
  } catch (error) {
    throw new Error(error);
  }
}
