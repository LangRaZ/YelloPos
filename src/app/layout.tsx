import './globals.css';
import { Metadata } from "next";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-full min-h-screen flex flex-col">
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
