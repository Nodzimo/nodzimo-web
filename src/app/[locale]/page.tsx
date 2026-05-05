import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useStaticLocale } from '@/i18n/static-locale'

export default function IndexPage({ params }: PageProps<'/[locale]'>) {
  const locale = useStaticLocale(params)
  const t = useTranslations()

  const { region } = new Intl.Locale(locale)
  console.debug(`[SN] Locale: ${locale}, Region: ${region}`)

  return (
    <div className={'flex flex-col gap-2'}>
      <Link href={'/test'}>{t('Navigation.testPage')}</Link>
      <h1 className={'font-bold text-2xl'}>{t('IndexPage.title')}</h1>
      <blockquote className={'whitespace-pre-line'}>
        {t('IndexPage.description')}
      </blockquote>
    </div>
  )
}
