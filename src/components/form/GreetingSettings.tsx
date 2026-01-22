import { SectionHeader } from '../ui/SectionHeader'
import type { Language } from '../../types/language'
import { ToneSelector } from './ToneSelector'
import type { Tone } from '../../types/tone'
import { LanguageSelector } from './LanguageSelector'
import { PostcardToggle } from './PostcardToggle'

interface IExtraDetailsSectionProps {
  tone: Tone
  language: Language
  isImageEnabled: boolean
  setTone: (tone: Tone) => void
  setLanguage: (language: Language) => void
  setIsImageEnabled: (isImageEnabled: boolean) => void
}

export const GreetingSettings = ({ tone, language, isImageEnabled, setTone, setLanguage, setIsImageEnabled }: IExtraDetailsSectionProps) => {
  return (
    <section className='space-y-4'>
      <SectionHeader step={3} title='Настройки' />

      <ToneSelector selectedTone={tone} setTone={setTone} />

      <LanguageSelector language={language} setLanguage={setLanguage} />

      <PostcardToggle isImageEnabled={isImageEnabled} setIsImageEnabled={setIsImageEnabled} />
    </section>
  )
}
