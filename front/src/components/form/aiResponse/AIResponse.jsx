import AIResponseFooter from './AIResponseFooter'
import AIResponseHeader from './AiResponseHeader'

function AIResponse({ answer }) {
  return (
    <div className='flex flex-col'>
      <AIResponseHeader />
      <article className='flex flex-col rounded-b-2xl bg-white rounded-2xl border border-gray-300 md:mt-4 mt-2 px-3 py-4'>
        {answer}
      </article>
      <AIResponseFooter />
    </div>
  )
}

export default AIResponse
