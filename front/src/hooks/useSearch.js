import { useState } from 'react'
import { searchAnswerApi } from '../apis/searchAnswerApi'
import { useMutation } from '@tanstack/react-query'

export default function useSearch({ setResults, handleClear }) {
  const [isCurious, setIsCurious] = useState(false)
  const mutation = useMutation({
    mutationFn: searchAnswerApi,
    onMutate: (question) => {
      setIsCurious(false)
      let isWaitingForAnswer = false
      setResults((prev) => {
        isWaitingForAnswer = prev.some((result) => result.answer === null)
        if (isWaitingForAnswer) return prev

        return [
          ...prev,
          {
            question,
            answer: null // 대기 중일 때는 null
          }
        ]
      })

      if (isWaitingForAnswer) {
        throw new Error('이전 질문에 대한 답변을 기다리고 있습니다.')
      }
    },
    onSuccess: (data, question) => {
      handleClear()
      setResults((prev) => {
        const newResults = [...prev]
        const lastIndex = newResults.length - 1

        if (lastIndex >= 0) {
          newResults[lastIndex] = {
            question,
            answer: data
          }
        }

        return newResults
      })
    },
    onError: (error, question) => {
      if (error.message === '이전 질문에 대한 답변을 기다리고 있습니다.') {
        return
      }

      setResults((prev) => {
        const newResults = [...prev]
        const lastIndex = newResults.length - 1

        if (lastIndex >= 0) {
          newResults[lastIndex] = {
            question,
            answer: '이해를 하지 못했습니다, 다시 입력해주세요.'
          }
        }

        return newResults
      })
      setIsCurious(true)

      console.error('Search Error:', error)
    }
  })

  return {
    isCurious,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    mutate: mutation.mutate
  }
}
