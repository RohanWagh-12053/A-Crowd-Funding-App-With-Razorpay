import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a Chai - Next.js",
  description: "Fundings for your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <SessionWrapper>
        <Navbar />
        
        <div className="mainParent h-fit">
        <div className="fixed bg-black bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="fixed z-20  left-[30vw] right-0 top-[0%] h-[90vh] w-[40vw] rounded-full bg-[radial-gradient(circle_20vw_at_50%_20vw,#fbfbfb36,#000)]"></div>
          {children}
         
          </div>
         
   
   </SessionWrapper>
      </body>
    </html>
  );
}
