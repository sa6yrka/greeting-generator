import { Globe } from 'lucide-react'
import { LANGUAGES } from '../../constants/languages'
import type { Language } from '../../types/language'

interface ILanguageSelectorProps {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageSelector = ({ language, setLanguage }: ILanguageSelectorProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mt-4'>
      <div className='relative group'>
        <label htmlFor='languages' className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Язык</label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Globe className='h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
          </div>
          <select
            value={language} id='languages'
            onChange={(e) => setLanguage(e.target.value as Language)}
            className='block w-full pl-9 pr-8 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all appearance-none cursor-pointer'
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
            <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

  )
}
