import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/Providers";
// import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Aishu Makeover | Beauty & Transformation",
  description:
    "Professional makeover, bridal, party looks by Aishu Makeover",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <Navbar /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}