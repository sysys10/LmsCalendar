import ChatBox from './ChatBox'
import { useEffect, useRef } from 'react'

export default function AnswerSection({ results, isLoading, isError }) {
  const resultRef = useRef(null)
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight
    }
  }, [results])
  return (
    <section
      ref={resultRef}
      className={`flex flex-col w-full h-[calc(100vh-12rem)] transition-all duration-300 overflow-y-auto`}
    >
      <div className='max-w-3xl mx-auto w-full'>
        {results.map((result, idx) => (
          <ChatBox
            key={`questio-${idx}`}
            isLoading={isLoading}
            result={result}
            isError={isError}
          />
        ))}
      </div>
    </section>
  )
}
