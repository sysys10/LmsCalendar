import useUserStore from '../stores/userStore'
import { useRef } from 'react'
import useSearchResult from '../hooks/useSearchResult'
import useSearch from '../hooks/useSearch'
import useInputState from '../hooks/useInputState'
import SearchBar from '../components/home/SearchBar'
import AnswerSection from '../components/form/AnswerSection'

export default function Home() {
  const user = useUserStore((state) => state.user)
  const inputRef = useRef(null)
  const { results, setResults, isFirstSearch } = useSearchResult()
  const { isSearching, search, handleClear, handleSearch } = useInputState({
    ref: inputRef
  })
  const {
    mutate: searchAnswer,
    isLoading,
    isError
  } = useSearch({ setResults, handleClear })
  console.log('isFirst', isFirstSearch)
  return (
    <div className='h-[calc(100vh-5rem)] max-w-[calc(100vw-2rem)] overflow-hidden bg-background'>
      <main className='flex-col items-center relative h-[calc(100vh-5rem)] w-full mx-auto px-2 transition-all duration-300'>
        <AnswerSection
          isLoading={isLoading}
          isError={isError}
          results={results}
        />
        <div
          className={`w-full mx-auto absolute bg-background ${isFirstSearch ? 'top-1/2 -translate-y-1/3' : 'bottom-0'}`}
        >
          {isFirstSearch && (
            <h1 className='text-center text-xl font-semibold text-secondary mb-20'>
              mainTitle
            </h1>
          )}
          <SearchBar
            setResults={setResults}
            isSearching={isSearching}
            search={search}
            handleClear={handleClear}
            handleSearch={handleSearch}
            inputRef={inputRef}
            searchAnswer={searchAnswer}
            isFirstSearch={isFirstSearch}
          />
        </div>
      </main>
    </div>
  )
}
