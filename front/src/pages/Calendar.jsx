import { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-modal'
import rrulePlugin from '@fullcalendar/rrule' // 추가
import '../index.css'
import useCalendarEvents from '../hooks/query/useEvents'
import CalendarModal from '../components/calendar/CalendarModal'
Modal.setAppElement('#root')
function CustomDateCell({ date, isToday, isWeekday }) {
  return (
    <div
      className={`w-6 text-center h-6 flex items-center justify-center rounded-full text-sm ${isToday ? 'bg-cta-active font-semibold text-white' : !isWeekday ? 'text-red-500' : 'text-copy-primary'}`}
    >
      <span>{date.getDate()}</span>
    </div>
  )
}
const initialEvents = [
  {
    id: '1',
    title: '알고리즘 분석',
    start: '2024-12-03T16:00:00',
    end: '2024-12-03T18:00:00',

    backgroundColor: 'rgb(191,219,254)',
    rrule: {
      freq: 'weekly',
      dtstart: '2024-12-03T16:00:00', // 시작 날짜 추가
      count: 5
    }
  },
  {
    id: '2',
    title: '시험기간',
    start: '2024-12-08T16:00:00',
    end: '2024-12-16T18:00:00',
    backgroundColor: 'rgb(191,219,254)'
  }
]

export default function MyCalendar() {
  const calendarRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const { fetchEvents, isFetchEventLoading } = useCalendarEvents()
  const handleFetchEvent = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    const currentView = calendarApi.view
    const start = currentView.currentStart
    const end = currentView.currentEnd

    // 현재 보이는 기간의 이벤트 조회
    const events = await fetchEvents(start, end)
    calendarApi.addEventSource(events) // 새 이벤트 추가
  }
  const handlePrevMonth = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    calendarApi.prev()
    console.log(calendarApi.getDate())
    await fetchEvents(calendarApi.getDate())
  }

  const handleNextMonth = async () => {
    const calendarApi = calendarRef.current?.getApi()
    if (!calendarApi) return

    calendarApi.next()
    await fetchEvents(calendarApi.getDate())
  }

  const handleToday = async () => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi.today()
    await fetchEvents(calendarApi.getDate())
  }
  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.changeView(view)
  }

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo)
    setIsModalOpen(true)
  }

  const handleEventClick = (clickInfo) => {
    // 이벤트 클릭 시 상세 정보 모달
    console.log(clickInfo.event)
  }

  const handleEvents = (events) => {
    // 이벤트 목록이 변경될 때마다 호출
    console.log(events)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedInfo(null)
    const calendarApi = calendarRef.current.getApi()
    calendarApi.unselect() // 선택 영역 제거
  }

  const handleCreateEvent = (eventData) => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      title: eventData.title,
      start: selectedInfo.startStr,
      end: selectedInfo.endStr,
      allDay: selectedInfo.allDay
    })

    handleCloseModal()
  }

  return (
    <div className='min-h-screen p-4 bg-background text-copy-primary rounded-xl relative'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-2'>
          <button onClick={handlePrevMonth} className='px-4 py-2 rounded'>
            이전
          </button>
          <button onClick={handleToday} className='px-4 py-2 rounded'>
            오늘
          </button>
          <button onClick={handleNextMonth} className='px-4 py-2 rounded'>
            다음
          </button>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => handleViewChange('dayGridMonth')}
            className='px-4 py-2 rounded'
          >
            월
          </button>
          <button
            onClick={() => handleViewChange('timeGridWeek')}
            className='px-4 py-2 rounded'
          >
            주
          </button>
          <button
            onClick={() => handleViewChange('timeGridDay')}
            className='px-4 py-2 rounded'
          >
            일
          </button>
        </div>
      </div>
      <button onClick={handleFetchEvent}>받기</button>
      <div className='flex-1'>
        <div className='bg-background shadow-lg overflow-hidden'>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              rrulePlugin
            ]}
            dayCellContent={(args) => (
              <CustomDateCell
                date={args.date}
                isToday={args.isToday}
                isWeekday={args.dow}
              />
            )}
            eventTimeFormat={{
              hour12: false,
              hour: 'numeric',
              minute: '2-digit'
            }}
            eventClassNames={'pl-1 text-xs'}
            initialView='dayGridMonth'
            editable={true}
            headerToolbar={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={initialEvents}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            locale='kr' // 한글 설정
            height='90vh'
          />
        </div>
      </div>
      <CalendarModal
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleCreateEvent={handleCreateEvent}
        selectedInfo={selectedInfo}
      />
    </div>
  )
}
