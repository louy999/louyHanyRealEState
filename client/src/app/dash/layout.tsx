import type { Metadata } from "next";
import "animate.css";
import ListBar from "./components/listBar";
import Navbar from "../components/NavBarComponents/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className={` antialiased`}>
      <div className="flex gap-4">
        <Navbar />
        <ListBar />
        {children}
      </div>
    </body>
  );
}
