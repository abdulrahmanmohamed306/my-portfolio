import type { Metadata } from "next";
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

const siteTitle = "Abdulrahman Mohamed | Senior Accountant & Data Analyst";
const siteDescription =
  "Senior General Accountant with 7+ years in financial reporting and general ledger, using Python, SQL and Power BI to turn financial data into business insights.";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-cyan-six-hsft2er28e.vercel.app"),
  title: {
    default: siteTitle,
    template: "%s | Abdulrahman Mohamed",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    images: [{ url: "/hero section.png", alt: "Abdulrahman Mohamed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/hero section.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
