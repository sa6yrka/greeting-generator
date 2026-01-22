import { Calendar, User } from 'lucide-react'
import { InterestsField } from './InterestsField'
import { SectionHeader } from '../../ui/SectionHeader'

interface IRecipientFormProps {
  age: string,
  name: string,
  error: string | null,
  interests: string,
  setAge: (age: string) => void,
  setName: (name: string) => void,
  setError: (error: string | null) => void,
  setInterests: (interests: string) => void,
}

export const RecipientForm = ({ age, name, error, interests, setAge, setName, setError, setInterests, }: IRecipientFormProps) => {
  return (
    <section className='space-y-4'>
      <SectionHeader step={2} title='О получателе' />

      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 relative group'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Имя *</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <User className='h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
            </div>
            <input
              id='name' type='text'
              value={name} placeholder='Сабыржан'
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError(null)
              }}
              className={`
                block w-full pl-9 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all
                ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-purple-500'}
              `}
            />
          </div>
          {error && <p className='text-red-500 text-sm ml-1 mt-1 animate-pulse'>{error}</p>}
        </div>

        <div className='col-span-1 relative group'>
          <label htmlFor='age' className='block text-sm font-medium text-gray-700 mb-1 ml-1'>Возраст</label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Calendar className='h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors' />
            </div>
            <input
              min={1} max={130}
              type='number' id='age'
              value={age} placeholder='18'
              onChange={(e) => setAge(e.target.value)}
              className='block w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all'
            />
          </div>
        </div>
      </div>

      <InterestsField interests={interests} setInterests={setInterests} />
    </section>
  )
}
