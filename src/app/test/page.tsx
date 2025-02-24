import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Test',
}

export default function page() {
  return (
    <>
    <Link href="/">link to homepage</Link>
    </>
    
  )
}
