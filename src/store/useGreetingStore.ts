import { create } from 'zustand'

interface GreetingStore {
  loading: boolean
  generatedText: string
  imageUrl: string | null

  setLoading: (value: boolean) => void
  setGeneratedText: (text: string) => void
  setImageUrl: (url: string | null) => void
}

export const useGreetingStore = create<GreetingStore>((set) => ({
  loading: false,
  generatedText: '',
  imageUrl: null,

  setLoading: (value) => set({ loading: value }),
  setGeneratedText: (text) => set({ generatedText: text }),
  setImageUrl: (url) => set({ imageUrl: url }),
}))
