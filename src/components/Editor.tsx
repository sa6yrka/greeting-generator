import { useState } from 'react'
import { Occasion } from '../types/occasion'
import { Tone } from '../types/tone'
import type { Language } from '../types/language'
import { OccasionSelector } from './form/OccasionSelector/OccasionSelector'
import { RecipientForm } from './form/RecipientForm/RecipientForm'
import { GreetingSettings } from './form/GreetingSettings/GreetingSettings'
import { GenerateButton } from './form/GenerateButton'
import { Sparkles } from 'lucide-react'
import { generateGreeting, generateGreetingImage } from '../services/gemini'

interface IEditorProps {
  loading: boolean
  setLoading: (loading: boolean) => void
  setGeneratedText: (text: string) => void
  setImageUrl: (url: string | null) => void
}

export const Editor = ({ loading, setLoading, setGeneratedText, setImageUrl }: IEditorProps) => {
  const [occasion, setOccasion] = useState<Occasion>(Occasion.BIRTHDAY)
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [interests, setInterests] = useState<string>('')
  const [tone, setTone] = useState<Tone>(Tone.FRIENDLY)
  const [language, setLanguage] = useState<Language>('Русский')
  const [error, setError] = useState<string | null>(null)
  const [isImageEnabled, setIsImageEnabled] = useState<boolean>(false)

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError('Пожалуйста, введите имя получателя.')
      return
    }

    setError(null)
    setLoading(true)
    setGeneratedText('')
    setImageUrl(null)

    try {
      const tasks: Promise<any>[] = [generateGreeting(occasion, name, age, interests, tone, language)]

      if (isImageEnabled) {
        tasks.push(generateGreetingImage(occasion, tone, language))
      }

      const results = await Promise.all(tasks)

      const textResult = results[0]
      setGeneratedText(textResult)

      if (isImageEnabled && results[1]) {
        setImageUrl(results[1])
      }
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='lg:col-span-5 sm:space-y-10 space-y-8'>
      <OccasionSelector occasion={occasion} setOccasion={setOccasion} />

      <RecipientForm
        age={age} name={name}
        error={error} interests={interests}
        setAge={setAge} setName={setName}
        setError={setError} setInterests={setInterests}
      />

      <GreetingSettings
        language={language} setLanguage={setLanguage}
        tone={tone} setTone={setTone}
        isImageEnabled={isImageEnabled}
        setIsImageEnabled={setIsImageEnabled}
      />

      <GenerateButton isDisabled={loading} onClick={handleGenerate}>
        <Sparkles className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
        {loading ? 'Сочиняем...' : 'Сгенерировать'}
      </GenerateButton>
    </div>
  )
}
