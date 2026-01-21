import { Editor } from './Editor'
import { Result } from './Result'
import { HeaderLayout } from './HeaderLayout'
import { useState } from 'react'

export const Layout = () => {
  const [generatedText, setGeneratedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl] = useState<string | null>(null)

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto'>
        <HeaderLayout />
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
          <Editor setGeneratedText={setGeneratedText} loading={loading} setLoading={setLoading} />
          <Result generatedText={generatedText} isLoading={loading} imageUrl={imageUrl} />
        </div>
      </div>
    </main>
  )
}
