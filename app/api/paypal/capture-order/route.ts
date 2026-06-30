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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderID = body.orderID;

    if (!orderID || typeof orderID !== "string") {
      return Response.json(
        {
          error: "A valid PayPal order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${encodeURIComponent(
        orderID
      )}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "PayPal-Request-Id": `capture-${orderID}`,
        },
        body: "{}",
        cache: "no-store",
      }
    );

    const capture = await response.json();

    if (!response.ok) {
      console.error("PayPal capture order error:", capture);

      return Response.json(
        {
          error: "The PayPal payment could not be captured.",
        },
        {
          status: response.status || 500,
        }
      );
    }

    if (capture.status !== "COMPLETED") {
      console.error("PayPal payment not completed:", capture);

      return Response.json(
        {
          error: "The PayPal payment has not been completed.",
          status: capture.status,
        },
        {
          status: 409,
        }
      );
    }

    return Response.json({
      id: capture.id,
      status: capture.status,
    });
  } catch (error) {
    console.error("Capture PayPal order error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while confirming the PayPal payment.",
      },
      {
        status: 500,
      }
    );
  }
}
