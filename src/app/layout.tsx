import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agency Dashboard",
  description: "Lead pipeline with encrypted key vault",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
