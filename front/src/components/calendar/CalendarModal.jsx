import Modal from 'react-modal'
import { eventFormStyle } from '../common/modal/style'
import { useState, useEffect } from 'react'

export default function CalendarModal({
  isOpen,
  handleCloseModal,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  selectedInfo
}) {
  const [eventData, setEventData] = useState({
    title: '',
    start: '',
    end: '',
    allDay: false,
    description: '',
    repeat: 'none'
  })

  const isEditMode = selectedInfo?.type === 'update'

  useEffect(() => {
    if (selectedInfo) {
      if (isEditMode) {
        // 수정 모드일 때 기존 이벤트 데이터로 폼 초기화
        setEventData({
          title: selectedInfo.title,
          start: selectedInfo.start?.toISOString().slice(0, 16) || '',
          end: selectedInfo.end?.toISOString().slice(0, 16) || '',
          allDay: selectedInfo.allDay,
          description: selectedInfo.extendedProps?.description || '',
          repeat: selectedInfo.extendedProps?.repeat || 'none'
        })
      } else {
        // 생성 모드일 때
        setEventData({
          ...eventData,
          start: selectedInfo.startStr,
          end: selectedInfo.endStr,
          allDay: selectedInfo.allDay
        })
      }
    }
  }, [selectedInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditMode) {
      handleUpdateEvent(eventData, selectedInfo.id)
    } else {
      handleCreateEvent(eventData)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={eventFormStyle}
    >
      <div className='modal-header'>
        <h2 className='text-xl font-bold'>
          {isEditMode ? '일정 수정' : '일정 생성'}
        </h2>
        <button
          onClick={handleCloseModal}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className='modal-body mt-4 space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            제목
          </label>
          <input
            type='text'
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
            required
          />
        </div>

        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={eventData.allDay}
              onChange={(e) =>
                setEventData({ ...eventData, allDay: e.target.checked })
              }
              className='rounded'
            />
            <span className='text-sm'>종일</span>
          </label>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              시작
            </label>
            <input
              type={eventData.allDay ? 'date' : 'datetime-local'}
              value={eventData.start}
              onChange={(e) =>
                setEventData({ ...eventData, start: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 p-2'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              종료
            </label>
            <input
              type={eventData.allDay ? 'date' : 'datetime-local'}
              value={eventData.end}
              onChange={(e) =>
                setEventData({ ...eventData, end: e.target.value })
              }
              className='mt-1 block w-full rounded-md border border-gray-300 p-2'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            반복
          </label>
          <select
            value={eventData.repeat}
            onChange={(e) =>
              setEventData({ ...eventData, repeat: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
          >
            <option value='none'>반복 안함</option>
            <option value='daily'>매일</option>
            <option value='weekly'>매주</option>
            <option value='monthly'>매월</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            설명
          </label>
          <textarea
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
            className='mt-1 block w-full rounded-md border border-gray-300 p-2'
            rows='3'
          />
        </div>

        <div className='modal-footer flex justify-end gap-2 pt-4'>
          {isEditMode && (
            <button
              type='button'
              onClick={() => handleDeleteEvent(selectedInfo.id)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              삭제
            </button>
          )}
          <button
            type='button'
            onClick={handleCloseModal}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            취소
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            {isEditMode ? '수정' : '생성'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
