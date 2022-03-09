import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'analia-mok/supa-crm',
    url: 'github.com/analia-mok/supa-crm'
  },
  typescript: true
});
