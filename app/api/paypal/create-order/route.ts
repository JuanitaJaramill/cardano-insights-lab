const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal server credentials are not configured.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    console.error("PayPal access token error:", data);
    throw new Error("PayPal authentication failed.");
  }

  return data.access_token as string;
}

export async function POST() {
  try {
    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": crypto.randomUUID(),
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: "CIL-BETA-OPPORTUNITY-PATH",
            description: "CIL Market Bridge Beta Opportunity Path",
            amount: {
              currency_code: "USD",
              value: "5.00",
            },
          },
        ],
      }),
      cache: "no-store",
    });

    const order = await response.json();

    if (!response.ok || !order.id) {
      console.error("PayPal create order error:", order);

      return Response.json(
        { error: "The PayPal order could not be created." },
        { status: response.status || 500 }
      );
    }

    return Response.json({ id: order.id });
  } catch (error) {
    console.error("Create PayPal order error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while creating the PayPal order.",
      },
      { status: 500 }
    );
  }
}
