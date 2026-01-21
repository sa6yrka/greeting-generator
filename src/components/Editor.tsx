import { useState } from 'react'
import { OccasionType } from '../types/occasionType'

export const Editor = () => {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY)

  return (
    <div className='max-w-7xl mx-auto'>
      <p>{occasion}</p>

      <button onClick={() => setOccasion(OccasionType.BIRTHDAY)}>День Рождения</button>
      <button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>Новый Год</button>
    </div>
  )
}
