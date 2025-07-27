import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/ThemeContext"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrackIt",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <ClerkProvider>
        <html lang="en" className="dark">
          <head>
            <link rel="icon" href="/TrackIt.png" sizes="any" />
          </head>
          <body className={`${inter.className}`}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-black py-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p className="text-white text-xl ">Made By Vikram Khandelwal</p>
              </div>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
