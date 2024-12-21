import { useEffect, useState } from 'react'

/**
 * 첫 검색인지 아닌지 판단하는 훅
 * @param searchedAnswer 검색 결과
 * @returns 첫 검색인지 아닌지
 */
const useIsFirstSearch = (results) => {
  const [isFirstSearch, setIsFirstSearch] = useState(true)

  useEffect(() => {
    if (results.length > 0) setIsFirstSearch(false)
  }, [results])

  return { isFirstSearch }
}

export default useIsFirstSearch
