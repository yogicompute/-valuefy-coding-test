import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Rebalancer",
  description: "Mutual fund portfolio rebalance tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-200 min-h-screen`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

          {/* Navbar */}
          <nav className="flex items-center justify-between border-b border-neutral-800 pb-4">

            <Link
              href="/"
              className="text-lg font-semibold hover:text-white"
            >
              Portfolio Rebalancer
            </Link>

            <div className="flex gap-6 text-sm text-neutral-400">

              <Link
                href="/comparison"
                className="hover:text-white transition"
              >
                Comparison
              </Link>

              <Link
                href="/investments"
                className="hover:text-white transition"
              >
                Investments
              </Link>

              <Link
                href="/history"
                className="hover:text-white transition"
              >
                History
              </Link>

              <Link
                href="/edit-plan"
                className="hover:text-white transition"
              >
                Edit Plan
              </Link>

            </div>
          </nav>

          {/* Page content */}
          <main className="space-y-10">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}