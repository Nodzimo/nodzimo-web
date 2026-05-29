import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// Used when no locale matches
	defaultLocale: 'en',

	// Will be merged with the defaults
	localeCookie: {
		// Expire in one year
		maxAge: 60 * 60 * 24 * 365,
		// Custom cookie name
		name: 'USER_LOCALE',
		// To be compliant out of the box, next-intl does not set the max-age value of the cookie, making it a session cookie that expires when a browser is closed.
	},

	// A list of all locales that are supported
	locales: ['en', 'ru', 'be', 'uk', 'de', 'fr', 'it', 'es', 'ar', 'zh', 'ja'],

	// The `pathnames` object holds pairs of internal and
	// external paths. Based on the locale, the external
	// paths are rewritten to the shared, internal ones.
	pathnames: {
		// If all locales use the same pathname, a single
		// external path can be used for all locales
		'/': '/',
		'/test': '/test',
	},
})
