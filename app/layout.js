import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Form Builder Using AI",
  description: "Made By Ayush",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}><Header/><Toaster/>{children}</body>
    </html>
    </ClerkProvider>
  );
}
