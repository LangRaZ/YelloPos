export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>Navbar</nav>
        {children}
      </body>
    </html>
  );
}
