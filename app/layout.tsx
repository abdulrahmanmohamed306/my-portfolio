import type { Metadata } from "next";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteTitle = "Abdulrahman Mohamed | Senior Accountant & Financial Data Analyst";
const siteDescription =
  "Senior General Accountant with +7 years in financial reporting and the general ledger, using Python, SQL and Power BI to turn financial data into business insight.";

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
    images: [{ url: "/my.photo.jpg", width: 400, height: 400, alt: "Abdulrahman Mohamed" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/my.photo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-sheet focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
