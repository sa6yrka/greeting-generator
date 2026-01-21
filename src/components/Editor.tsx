import { useState } from 'react'
import { OccasionType } from '../types/occasionType'
import { ToneType } from '../types/toneType'
import { LANGUAGES } from '../constants/languages'
import type { LanguageType } from '../types/languageType'
import { generateGreeting } from '../services/gemini'
import { OccasionSelector } from './OccasionSelector'
import { RecipientForm } from './RecipientForm'

export const Editor = () => {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)

  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const [interests, setInterests] = useState<string>('')

  const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)

  const [language, setLanguage] = useState<LanguageType>('Русский')

  const [generatedText, setGeneratedText] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError('Please enter the recipient’s name.')
      return
    }

    setError(null)
    setLoading(true)
    setGeneratedText('')

    try {
      const result = await generateGreeting(occasion, name, age, interests, tone, language)
      setGeneratedText(result)
    } catch (error: any) {
      setError(error.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='lg:col-span-5 sm:space-y-10 space-y-8'>
      <div>
        <p>{occasion}</p>

        <p>{name}</p>
        <p>{age}</p>

        <p>{interests}</p>

        <p>{tone}</p>

        <p>{language}</p>

        <p>{generatedText}</p>

        <p>{error}</p>
      </div>

      <OccasionSelector occasion={occasion} setOccasion={setOccasion} />

      <RecipientForm
        age={age} name={name}
        error={error} interests={interests}
        setAge={setAge} setName={setName}
        setError={setError} setInterests={setInterests}
      />

      <div>
        {Object.values(ToneType).map((tone) => (
          <button
            key={tone} type='button'
            onClick={() => setTone(tone)}
          >
            {tone}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor='languages'>Languages: </label>
        <select
          id='languages' name='languages'
          onChange={(e) => setLanguage(e.target.value as LanguageType)}
        >
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        Создать магию 🪄
      </button>
    </div>
  )
}
