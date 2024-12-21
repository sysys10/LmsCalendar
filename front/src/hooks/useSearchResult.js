import { useState } from 'react'
import useIsFirstSearch from './useIsFirstSearch'

const useSearchResult = () => {
  const [results, setResults] = useState([])
  const { isFirstSearch } = useIsFirstSearch(results)

  return {
    results,
    setResults,
    isFirstSearch
  }
}

export default useSearchResult
