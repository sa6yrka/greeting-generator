import { create } from 'zustand'
import { Occasion } from '../types/occasion'
import { Tone } from '../types/tone'
import type { Language } from '../types/language'
import { generateGreeting, generateGreetingImage } from '../services/gemini'

interface GreetingStore {
  // form
  occasion: Occasion
  name: string
  age: string
  interests: string
  tone: Tone
  language: Language
  isImageEnabled: boolean
  error: string | null

  // result
  loading: boolean
  generatedText: string
  imageUrl: string | null

  // actions
  setField: <K extends keyof Omit<GreetingStore,
    | 'setField'
    | 'generate'
  >>(
    key: K,
    value: GreetingStore[K],
  ) => void

  generate: () => Promise<void>
}

export const useGreetingStore = create<GreetingStore>((set, get) => ({
  // form defaults
  occasion: Occasion.BIRTHDAY,
  name: '',
  age: '',
  interests: '',
  tone: Tone.FRIENDLY,
  language: 'Русский',
  isImageEnabled: false,
  error: null,

  // result defaults
  loading: false,
  generatedText: '',
  imageUrl: null,

  setField: (key, value) => set({ [key]: value }),

  generate: async () => {
    const {
      occasion,
      name,
      age,
      interests,
      tone,
      language,
      isImageEnabled,
    } = get()

    if (!name.trim()) {
      set({ error: 'Пожалуйста, введите имя получателя.' })
      return
    }

    set({ loading: true, error: null, generatedText: '', imageUrl: null })

    try {
      const tasks: Promise<any>[] = [
        generateGreeting(occasion, name, age, interests, tone, language),
      ]

      if (isImageEnabled) {
        tasks.push(generateGreetingImage(occasion, tone, language))
      }

      const results = await Promise.all(tasks)

      set({ generatedText: results[0] })

      if (isImageEnabled && results[1]) {
        set({ imageUrl: results[1] })
      }
    } catch (e: any) {
      set({ error: e.message || 'Произошла ошибка.' })
    } finally {
      set({ loading: false })
    }
  },
}))
