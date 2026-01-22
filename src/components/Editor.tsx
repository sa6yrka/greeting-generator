import { Sparkles } from 'lucide-react'
import { OccasionSelector } from './form/OccasionSelector/OccasionSelector'
import { RecipientForm } from './form/RecipientForm/RecipientForm'
import { GreetingSettings } from './form/GreetingSettings/GreetingSettings'
import { GenerateButton } from './form/GenerateButton'
import { useGreetingStore } from '../store/useGreetingStore'

export const Editor = () => {
  const {
    occasion,
    name,
    age,
    interests,
    tone,
    language,
    isImageEnabled,
    error,
    loading,
    setField,
    generate,
  } = useGreetingStore()

  return (
    <div className='lg:col-span-5 space-y-8'>
      <OccasionSelector
        occasion={occasion}
        setOccasion={(v) => setField('occasion', v)}
      />

      <RecipientForm
        name={name}
        age={age}
        interests={interests}
        error={error}
        setName={(v) => setField('name', v)}
        setAge={(v) => setField('age', v)}
        setInterests={(v) => setField('interests', v)}
      />

      <GreetingSettings
        tone={tone}
        language={language}
        isImageEnabled={isImageEnabled}
        setTone={(v) => setField('tone', v)}
        setLanguage={(v) => setField('language', v)}
        setIsImageEnabled={(v) => setField('isImageEnabled', v)}
      />

      <GenerateButton isDisabled={loading} onClick={generate}>
        <Sparkles
          className={`w-5 h-5 ${
            loading ? 'animate-spin' : 'group-hover:animate-pulse'
          }`}
        />
        {loading ? 'Сочиняем...' : 'Сгенерировать'}
      </GenerateButton>
    </div>
  )
}
