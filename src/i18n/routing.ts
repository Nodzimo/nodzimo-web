import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ru'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Will be merged with the defaults
  localeCookie: {
    // Custom cookie name
    name: 'USER_LOCALE',
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365,
    // To be compliant out of the box, next-intl does not set the max-age value of the cookie, making it a session cookie that expires when a browser is closed.
  },
})
