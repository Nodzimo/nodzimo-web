import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ['latin', 'cyrillic'],
	variable: '--app-font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ['latin', 'cyrillic'],
	variable: '--app-font-mono',
	weight: ['400', '500', '600', '700'],
})

export const fontVariables = `${ibmPlexSans.variable} ${ibmPlexMono.variable}`
