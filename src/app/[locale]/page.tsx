import { useLocale, useTranslations } from 'next-intl'

export default function IndexPage() {
  const t = useTranslations('IndexPage')
  const locale = useLocale()
  const { region } = new Intl.Locale(locale)
  console.debug(`[SN] Locale: ${locale}, Region: ${region}`)

  return (
    <div>
      <h1 className={'mb-2 font-bold text-2xl'}>{t('title')}</h1>
      <blockquote className={'whitespace-pre-line'}>
        {t('description')}
      </blockquote>
    </div>
  )
}
