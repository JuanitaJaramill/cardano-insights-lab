import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIL Market Bridge",
  description:
    "An interactive app to help businesses turn uncertainty about blockchain into a clearer evaluation path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
