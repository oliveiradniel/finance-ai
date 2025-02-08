"use client";

import Link from "next/link";

import { useUser } from "@clerk/nextjs";

import { loadStripe } from "@stripe/stripe-js";

import { createStripeCheckout } from "../_actions/create-stripe-checkout";

import { Button } from "@/app/_components/ui/button";

export default function AcquirePlanButton() {
  const { user } = useUser();

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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";
  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handlePlanAcquisiton}
    >
      Adquirir Plano
    </Button>
  );
}
