import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Navbar";
import { ArticleProvider } from "@/context/articleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Addict",
  description: "Mon premier blog avec next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ArticleProvider>
          <Nav />
          {children}
        </ArticleProvider>
      </body>
    </html>
  );
}
