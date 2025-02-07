import { NextResponse } from "next/server";

import { clerkClient } from "@clerk/nextjs/server";

import Stripe from "stripe";

export async function POST(request: Request) {
  const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
      // Update user with your new plan
      const { customer, subscription, subscription_details } =
        event.data.object;

      const clerkUserId = subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      (await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
  }

  return NextResponse.json({ received: true });
}
