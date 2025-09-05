import type { Metadata } from "next";
import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Decypher - AI That Makes Documents Human-Friendly",
  description: "Simplify the Complex. Decypher the Legal. Transform complex documents into easy-to-understand flowcharts and actionable insights.",
  keywords: ["AI", "document analysis", "legal documents", "flowcharts", "simplification"],
  authors: [{ name: "Decypher Team" }],
  openGraph: {
    title: "Decypher - AI That Makes Documents Human-Friendly",
    description: "Transform complex documents into easy-to-understand flowcharts and actionable insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
