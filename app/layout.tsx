import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sacrament-meetings.vercel.app"),
  title: {
    default: "Sacrament Meetings Planner",
    template: "%s | Sacrament Meetings",
  },
  description:
    "Plan, organize, and review sacrament meeting details with a simple, modern planner.",
  openGraph: {
    title: "Sacrament Meetings Planner",
    description:
      "Plan, organize, and review sacrament meeting details with a simple, modern planner.",
    type: "website",
    url: "/",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meetings Planner",
    description:
      "Plan, organize, and review sacrament meeting details with a simple, modern planner.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
