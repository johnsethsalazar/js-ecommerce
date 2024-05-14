// Separate this from api > checkout > route.ts to here. In the local test it's working well but on deployment it does not.
import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});