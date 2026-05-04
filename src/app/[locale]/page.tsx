import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function IndexPage() {
  const t = useTranslations()
  const locale = useLocale()
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
