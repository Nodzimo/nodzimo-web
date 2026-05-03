import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import { routing } from '@/i18n/routing'

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

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-fuchsia-500 antialiased`}
    >
      <body className={'flex min-h-full flex-col bg-lime-500'}>
        <NextIntlClientProvider>
          <header className={'bg-sky-100 p-2 text-center'}>Header</header>
          <main
            className={'flex grow items-center justify-center bg-amber-100 p-2'}
          >
            {children}
          </main>
          <footer className={'bg-emerald-100 p-2 text-center'}>Footer</footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
