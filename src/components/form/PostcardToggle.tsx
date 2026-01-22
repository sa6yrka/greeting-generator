import { ImageIcon } from 'lucide-react'

interface IPostcardToggleProps {
  isImageEnabled: boolean
  setIsImageEnabled: (value: boolean) => void
}

export const PostcardToggle = ({ isImageEnabled, setIsImageEnabled }: IPostcardToggleProps) => {
  return (
    <div className='flex items-center pt-2 sm:pt-6'>
      <label
        className={`
            relative flex items-center p-3 rounded-xl border-2 cursor-pointer w-full h-13 transition-all duration-200 select-none
            ${isImageEnabled ? 'border-purple-500 bg-purple-50' : 'border-gray-100 bg-white hover:border-purple-200'}
          `}
      >
        <input
          type='checkbox'
          className='w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 accent-purple-600'
          checked={isImageEnabled}
          onChange={(e) => setIsImageEnabled(e.target.checked)}
        />
        <span className={`ml-3 text-sm font-medium ${isImageEnabled ? 'text-purple-700' : 'text-gray-700'}`}>
              Сгенерировать открытку
            </span>
        {isImageEnabled && <ImageIcon className='w-4 h-4 ml-auto text-purple-600' />}
      </label>
    </div>
  )
}
