import { OccasionButton } from './OccasionButton'
import { Cake, Snowflake } from 'lucide-react'
import { OccasionType } from '../types/occasionType'

interface IOccasionSelectorProps {
  occasion: OccasionType
  setOccasion: (value: OccasionType) => void
}

export const OccasionSelector = ({ occasion, setOccasion }: IOccasionSelectorProps) => {
  return (
    <section className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
            <span
              className='flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs'>1</span>
          Выберите праздник
        </h3>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <OccasionButton
          icon={Cake} label={OccasionType.BIRTHDAY}
          isSelected={occasion === OccasionType.BIRTHDAY}
          onClick={() => setOccasion(OccasionType.BIRTHDAY)}
        />
        <OccasionButton
          icon={Snowflake} label={OccasionType.NEW_YEAR}
          isSelected={occasion === OccasionType.NEW_YEAR}
          onClick={() => setOccasion(OccasionType.NEW_YEAR)}
        />
      </div>
    </section>
  )
}
