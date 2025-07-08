import "./globals.css";
import MainLayout from "@/components/MainLayout"
// import type { Metadata } from "next";
import {Providers} from "./providers"
import {Geist} from 'next/font/google'

// export const metadata: Metadata = {
//   title: "Snack & Track",
//   description: "Track your nutrition with ease",
// };
const GeistFont=Geist({
  subsets:['latin'],
  display:"swap"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistFont.className}>
      <body>

        <Providers>
       
          <MainLayout>{children}</MainLayout>
        </Providers>
        
     
      </body>
    </html>
  );
}
