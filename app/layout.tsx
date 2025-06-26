import "./globals.css";
import MainLayout from "@/components/MainLayout"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snack & Track",
  description: "Track your nutrition with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

       
          <MainLayout>{children}</MainLayout>
        
     
      </body>
    </html>
  );
}
