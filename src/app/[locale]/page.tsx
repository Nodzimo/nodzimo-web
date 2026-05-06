import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useStaticLocale } from '@/i18n/static-locale'

export default function IndexPage({ params }: PageProps<'/[locale]'>) {
  useStaticLocale(params)
  const t = useTranslations('IndexPage')

  return (
    <div className={'flex flex-col gap-2'}>
      <Link href={'/test'}>{t('testPageLink')}</Link>
      <h1 className={'font-bold text-2xl'}>{t('title')}</h1>
      <blockquote className={'whitespace-pre-line'}>
        {t('description')}
      </blockquote>
    </div>
  )
}
