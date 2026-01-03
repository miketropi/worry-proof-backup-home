import Header from "./components/Header";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
// import { Space_Mono, Google_Sans } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Worry Proof Backup",
  description: "Professional WordPress backup solution with comprehensive database and file system protection. Features automated backups, secure storage, and one-click restoration capabilities. Built for reliability and ease of use in production environments. **100% FREE FOREVER** - No hidden costs, no premium tiers, no limitations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-google-sans antialiased`}
      >
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
