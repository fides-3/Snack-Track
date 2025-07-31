import "./globals.css";
import MainLayout from "@/components/MainLayout"
// import type { Metadata } from "next";
import {Providers} from "./providers"
import {Geist} from 'next/font/google'
// import {ThemeProvider} from 'next-themes'

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
    <html lang="en" suppressHydrationWarning className={`${GeistFont.className}`}>
      <body className="bg-white dark:bg-black text-black dark:text-white">
       
        <Providers>
       
          <MainLayout>{children}</MainLayout>
        </Providers>
        
        
     
      </body>
    </html>
  );
}
