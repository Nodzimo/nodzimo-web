import { type Formats, hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	const requested = await requestLocale

	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})

export const formats = {
	dateTime: {
		short: {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		},
	},
	displayName: {
		region: {
			type: 'region',
		},
	},
	list: {
		enumeration: {
			style: 'long',
			type: 'conjunction',
		},
	},
	number: {
		precise: {
			maximumFractionDigits: 5,
		},
	},
} satisfies Formats
