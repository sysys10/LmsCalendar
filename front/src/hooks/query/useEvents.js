import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import useCalendarStore from '@stores/calendarStore'
import { getCalendar } from '../../apis/calendarApi'

const useCalendarEvents = () => {
  const queryClient = useQueryClient()
  const setEvents = useCalendarStore((state) => state.setEvents)

  // 현재 달의 이벤트를 조회하는 쿼리
  const { data: events, isLoading: isQueryLoading } = useQuery({
    // queryKey: ['events', dayjs().format('YYYY-MM')],
    // 초기 데이터 로딩 방지 (수동으로 fetchEvents 호출할 예정)
    enabled: false
  })

  const fetchEventsMutation = useMutation({
    mutationFn: ({ currentDate }) => {
      const startDate = dayjs(currentDate)
        .startOf('month')
        .subtract(1, 'week')
        .format('YYYY-MM-DD')

      const endDate = dayjs(currentDate)
        .endOf('month')
        .add(1, 'week')
        .format('YYYY-MM-DD')
      // console.log(startDate, endDate)
      return getCalendar({ startDate, endDate })
    },

    onSuccess: (data, variables) => {
      setEvents(data)
      // 해당 월의 데이터를 React Query 캐시에 저장
      // queryClient.setQueryData(
      //   ['events', dayjs(variables.currentDate).format('YYYY-MM')],
      //   data
      // )
    },

    onError: (error) => {
      console.error('이벤트 조회 실패:', error)
    }
  })

  const fetchEvents = async (currentDate) => {
    try {
      return await fetchEventsMutation.mutateAsync({ currentDate })
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  return {
    events,
    fetchEvents,
    isLoading: isQueryLoading || fetchEventsMutation.isLoading,
    error: fetchEventsMutation.error
  }
}

export default useCalendarEvents
