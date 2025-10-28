import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import "../styles/_index.scss";
import { ThemeProvider } from "@/context/ThemeContext";
import DashboardLayout from "@/layout/DashboardLayout";
import Providers from "./providers";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoice Application",
  description: "Divest Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} antialiased`}>
        <Providers>
          <ThemeProvider>
            <DashboardLayout> {children}</DashboardLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
