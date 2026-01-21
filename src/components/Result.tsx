interface IResultProps {
  generatedText: string
}

export const Result = ({ generatedText }: IResultProps) => {
  return <div className='className="lg:col-span-7 h-full'>{generatedText}</div>
}
