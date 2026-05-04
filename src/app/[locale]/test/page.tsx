import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function TestPage() {
  const t = useTranslations()

  return (
    <div className={'flex flex-col gap-10'}>
      <Link href={'/'}>{t('Navigation.indexPage')}</Link>
      <p>{t('TestPage.pangram')}</p>
      <p>{t('TestPage.alphabetUppercase')}</p>
      <p>{t('TestPage.alphabetLowercase')}</p>
      <p>0 1 2 3 4 5 6 7 8 9</p>
      <p>ilI1L g oO0Q СФ</p>
      <p>
        :D :-) ^^ : ) TT :) :o :O :0 :P xD :| :/ :\ :3 {'>'}:E o_O 0_0 ))) {'<'}
        3 .!. :'(
      </p>
      <p>₿ ₽ ₹ $ ¢ € £ ¥ ¤</p>
      <p>☭ © ® ™ ´ · ˆ ˚ ˜</p>
      <p>⌀ ∞ √ ° % ¹ ² ³ ¼ ½ ¾ + - = ≠ × ÷ ±</p>
      <p>{'< > { }'}</p>
      <p>~ / @ [ \ ] | ^ ¦ _ `</p>
      <p>§ • … ? ... ! " # № & ' ( ) * . , : ;</p>
      <p>‐ ‑ ‒ – —</p>
      <p>‹ › « » ‘ ’ ‚ “ ” „</p>
      <p>← → ↑ ↓ ▲ ▼ ↻ ↺</p>
      <p>✓ ✔ 🗸 ✖ ✗ ✘ ☒</p>
    </div>
  )
}
