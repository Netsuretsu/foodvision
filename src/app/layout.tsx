import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import TanstackQueryProvider from "@/providers/TanstackProvider";


const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Foodvision",
  description: "Food recognition app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <div className="p-4">
          <TanstackQueryProvider>
            <Header />
            {children}
          </TanstackQueryProvider>

        </div>
      </body>
    </html>
  );
}
