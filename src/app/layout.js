import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteWatcher from "./routesWacher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ThinkDrop",
  description: "Learn new siklls by accepting a new challange daily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RouteWatcher />
        {children}
      </body>
    </html>
  );
}
