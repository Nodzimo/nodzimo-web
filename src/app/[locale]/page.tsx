import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <div>
      <h1 className={'mb-2 font-black text-2xl'}>{t('title')}</h1>
      <p>It begins very small</p>
      <p>seems like nothing much at all</p>
      <p>Just a germ, just a speck, just a grain</p>
      <p>but the seed has been sown</p>
      <p>and before you know it's grown</p>
      <p>It has spread through your life like a stain</p>
      <p>And its power will strangle your love and joy</p>
      <p>and it's hunger consumes for it lives to destroy</p>
    </div>
  )
}
