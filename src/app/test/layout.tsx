import React from 'react'

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
    <body
     
    >
      {children}
    </body>
  </html>
  )
}
