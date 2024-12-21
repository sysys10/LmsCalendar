import { create } from 'zustand'

const useCalendarStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events })
}))

export default useCalendarStore
// {
//   "calendars": [
//     {
//       "id": "primary"
//     },
//     {
//       "id": "user_674d5f655d4f9c468c65daaa",
//       "name": "lms",
//       "color": "ROYAL_BLUE"
//     }
//   ],
//   "subscribe_calendars": []
// }

// 저번달 1주일, 다음달 1주일을 받아오기.
// 저번달로 넘겨서 전부 받으면, loading동안은 저번달걸 보여주게됨. 그런데 저번달거 다 받아오면 그걸로 overwrite하기.
// const useCalendarStore = create((set) => ({
//   calendars: [{ id: "primary", name: "개인", color: "ROYAL_BLUE" }],

//   setCalendars: (newCalendar) => {
//     set((state) => ({
//       calendar: [
//         state.calendar[0], // 기본 캘린더 유지
//         ...newCalendar,
//       ],
//     }));
//   },
//   events: [],
//   setEvents: (newEvents) => {
//     set({
//       events: [newEvents],
//     });
//   },

//   // 이벤트 받아놓고 미리 state에 저장해놓는데 그럼 그 id는 어떻게 할거냐
//   // 이벤트 아이디를 따로 만들어놓고 onSuccess로 그 아이디만 받아서 아이디 바꿔주기 ㅇㅇ
//   addEvent: (newEvent) => {
//     const tempId = `temp-${Date.now()}`; // 임시 ID 생성
//     set((state) => ({
//       events: [...state.events, { ...newEvent, id: tempId }],
//     }));
//     return tempId; // 임시 ID 반환
//   },
//   // 이 함수로 업데이트 할거임.
//   replaceTempId: (tempId, serverId) => {
//     set((state) => ({
//       events: state.events.map((event) =>
//         event.id === tempId ? { ...event, id: serverId } : event
//       ),
//     }));
//   },
//   // 실패 시 롤백을 위한 삭제
//   removeTempEvent: (tempId) => {
//     set((state) => ({
//       events: state.events.filter((event) => event.id !== tempId),
//     }));
//   },
// }));

// export default useCalendarStore;
