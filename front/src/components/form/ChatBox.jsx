import UserMessage from './UserMessage'
import AIResponse from './aiResponse/AIResponse'
import LoadingState from './LoadingState'
import ErrorMessage from './ErrorMessage'

export default function ChatBox({ isLoading, result, isError }) {
  return (
    <div className='w-full p-4 mt-4 max-md:min-h-[calc(100vh-10rem)]'>
      <div className='flex flex-col'>
        <UserMessage message={result.question} />
        {result.answer ? (
          <AIResponse answer={result.answer} />
        ) : isLoading ? (
          <LoadingState />
        ) : (
          isError && <ErrorMessage />
        )}
      </div>
    </div>
  )
}
