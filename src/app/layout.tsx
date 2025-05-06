import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: "YelloPOS",
  description: "",
  icons:{
    icon: [{url: "/icons/logo-collapsed.svg", sizes: "196x196", type: "image/svg"}]
  }
} 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased w-full min-h-screen flex flex-col">
          {children}
          <Toaster />
      </body>
    </html>
  );
}
