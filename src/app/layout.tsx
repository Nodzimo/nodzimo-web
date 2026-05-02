import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import type { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sefo Nodzimo',
  description: 'Nodzimo.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang={'en'}
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-fuchsia-500 antialiased`}
    >
      <body className={'flex min-h-full flex-col bg-lime-500'}>
        <header className={'bg-sky-100 p-2 text-center'}>Header</header>
        <main
          className={'flex grow items-center justify-center bg-amber-100 p-2'}
        >
          {children}
        </main>
        <footer className={'bg-emerald-100 p-2 text-center'}>Footer</footer>
      </body>
    </html>
  )
}
