import { useState } from 'react'
import { OccasionType } from '../types/occasionType'
import { ToneType } from '../types/toneType'
import { LANGUAGES } from '../constants/languages'
import type { LanguageType } from '../types/languageType'
import { generateGreeting } from '../services/gemini'
import { HeaderLayout } from './HeaderLayout'

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
    <div className='max-w-7xl mx-auto'>
      <HeaderLayout />

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

      <div>
        <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>День Рождения</button>
        <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>Новый Год</button>
      </div>

      <div>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            id='name' type='text'
            value={name} placeholder='Сабыржан'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='age'>Age: </label>
          <input
            type='text' id='age'
            value={age} placeholder='18'
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='interests'>Interests: </label> <br />
          <textarea
            cols={30} rows={2} id='interests'
            name='interests' value={interests}
            placeholder='Traveling, Coding, Motorsport'
            onChange={(e) => setInterests(e.target.value)}
          ></textarea>
        </div>
      </div>

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
