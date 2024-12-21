import axiosInstance from './axiosInstance'

//2024-01-01 형식
const getCalendar = async ({ startDate, endDate }) => {
  console.log('get 시작', startDate, endDate)
  const { data } = await axiosInstance.get(
    `/calendar/events?start_at=${startDate}&end_at=${endDate}`
  )
  return data
}

const postCalendar = async ({ newCalendar }) => {
  const { data } = await axiosInstance.post('/calendar', newCalendar)
  return data
}

const deleteCalendar = async ({ calendarId }) => {
  const { data } = await axiosInstance.delete(`/calendar/${calendarId}`)
  return data
}

const updateCalendar = async ({ calendarId, updateCalendar }) => {
  const { data } = await axiosInstance.put(
    `/calendar/${calendarId}`,
    updateCalendar
  )
  return data
}

export { getCalendar, postCalendar, deleteCalendar, updateCalendar }
