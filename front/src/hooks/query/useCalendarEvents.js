import { useMutation } from '@tanstack/react-query'
import useCalendarStore from '../../stores/calendarStore'

const useCalendarEvents = () => {
  const setEvents = useCalendarStore((state) => state.setEvents)
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

      return getCalendar({ startDate, endDate })
    },

    onSuccess: (data) => {
      setEvents(data)
    },

    onError: (error) => {
      console.error('이벤트 조회 실패:', error)
    }
  })

  // 이벤트 생성 mutation
  const createEventMutation = useMutation({
    mutationFn: (newEvent) => postCalendar({ newCalendar: newEvent })
  })

  // 이벤트 수정 mutation
  const updateEventMutation = useMutation({
    mutationFn: ({ calendarId, updateData }) =>
      updateCalendar({ calendarId, updateCalendar: updateData })
  })

  // 이벤트 삭제 mutation
  const deleteEventMutation = useMutation({
    mutationFn: (calendarId) => deleteCalendar({ calendarId })
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
    fetchEvents,
    createEvent: createEventMutation.mutateAsync,
    updateEvent: updateEventMutation.mutateAsync,
    deleteEvent: deleteEventMutation.mutateAsync,
    isLoading:
      fetchEventsMutation.isLoading ||
      createEventMutation.isLoading ||
      updateEventMutation.isLoading ||
      deleteEventMutation.isLoading,
    error: fetchEventsMutation.error
  }
}

export default useCalendarEvents
