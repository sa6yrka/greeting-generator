import { useState } from 'react'
import { OccasionType } from '../types/occasionType'
import { ToneType } from '../types/toneType'
import { LANGUAGES } from '../constants/languages'
import type { LanguageType } from '../types/languageType'
import { generateGreeting } from '../services/gemini'

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

      <section className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
            <span className='flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs'>1</span>
            Выберите праздник
          </h3>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>День Рождения</button>
          <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>Новый Год</button>
        </div>
      </section>

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
