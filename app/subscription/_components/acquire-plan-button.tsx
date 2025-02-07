"use client";

import { loadStripe } from "@stripe/stripe-js";

import { createStripeCheckout } from "../_actions/create-stripe-checkout";

import { Button } from "@/app/_components/ui/button";

export default function AcquirePlanButton() {
  async function handlePlanAcquisiton() {
    const { sessionId } = await createStripeCheckout();

    const publicStripePublishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publicStripePublishableKey) {
      throw new Error("Stripe publishable key not found");
    }

    const stripe = await loadStripe(publicStripePublishableKey);

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handlePlanAcquisiton}
    >
      Adquirir plano
    </Button>
  );
}
