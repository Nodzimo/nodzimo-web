import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <div>
      <h1 className={'mb-2 font-black text-2xl'}>{t('title')}</h1>
      <blockquote className={'whitespace-pre-line'}>
        {t('description')}
      </blockquote>
    </div>
  )
}
