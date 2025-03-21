import './globals.css';
import { Metadata } from "next";
import { Toaster } from 'sonner';
import { AuthProvider } from "./(auth)/context/authcontext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased w-full min-h-screen flex flex-col">
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
