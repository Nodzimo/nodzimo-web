import type { MetadataRoute } from 'next'
import type { Locale } from 'next-intl'
import { getPathname, routing } from '@/i18n'

const host = 'https://nodzimo.com'

type Href = keyof typeof routing.pathnames

type SitemapEntry = MetadataRoute.Sitemap[number]

type SitemapRoute = {
	href: Href
} & Pick<SitemapEntry, 'changeFrequency' | 'priority'>

const sitemapRoutes: readonly SitemapRoute[] = [
	{
		changeFrequency: 'daily',
		href: '/',
		priority: 1,
	},
	{
		changeFrequency: 'weekly',
		href: '/test',
		priority: 0.1,
	},
]

function getUrl(locale: Locale, href: Href) {
	return host + getPathname({ href, locale })
}

type LanguageAlternates = Record<Locale, string>

function getLanguageAlternates(href: Href): LanguageAlternates {
	return Object.fromEntries(
		routing.locales.map((locale: Locale): [Locale, string] => {
			return [locale, getUrl(locale, href)]
		}),
	) as LanguageAlternates
}

export default function sitemap(): MetadataRoute.Sitemap {
	return sitemapRoutes.map(
		({ href, changeFrequency, priority }): SitemapEntry => {
			return {
				alternates: {
					languages: getLanguageAlternates(href),
				},
				changeFrequency,
				lastModified: new Date(),
				priority,
				url: getUrl(routing.defaultLocale, href),
			}
		},
	)
}
