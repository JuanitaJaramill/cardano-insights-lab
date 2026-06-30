"use client";

import { useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

type PayPalButtonProps = {
  betaRequestUrl: string;
};

export default function PayPalButton({
  betaRequestUrl,
}: PayPalButtonProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="mt-5 text-sm text-red-300">
        PayPal is not configured yet.
      </p>
    );
  }

  if (isPaid) {
    return (
      <div className="mt-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-5">
        <p className="font-bold text-green-200">
          Payment completed successfully.
        </p>

        <p className="mt-2 text-sm leading-6 text-[#ddd3ee]">
          Continue to the Beta Opportunity Path request form.
        </p>

        <a
          href={betaRequestUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full bg-[#d8bbff] px-6 py-3 text-sm font-bold text-[#241334] transition hover:bg-[#e6d3ff]"
        >
          Continue to Opportunity Path
        </a>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-md">
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "pill",
            label: "paypal",
          }}
          createOrder={async () => {
            setErrorMessage("");

            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const order = await response.json();

            if (!response.ok || !order.id) {
              throw new Error(
                order.error || "The PayPal order could not be created."
              );
            }

            return order.id;
          }}
          onApprove={async (data) => {
            setErrorMessage("");

            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });

            const capture = await response.json();

            if (!response.ok || capture.status !== "COMPLETED") {
              throw new Error(
                capture.error || "The payment could not be confirmed."
              );
            }

            setIsPaid(true);
          }}
          onCancel={() => {
            setErrorMessage(
              "The payment was cancelled. No charge was completed."
            );
          }}
          onError={(error) => {
            console.error("PayPal error:", error);
            setErrorMessage(
              "PayPal could not complete the transaction. Please try again."
            );
          }}
        />
      </PayPalScriptProvider>

      {errorMessage && (
        <p className="mt-4 text-sm leading-6 text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
