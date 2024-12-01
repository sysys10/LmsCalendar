import { useEffect, useRef } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

const MyCalendar = () => {
  const calendarRef = useRef(null);

  const initialEvents = [
    {
      id: "1",
      calendarId: "cal1",
      title: "샘플 이벤트",
      category: "time",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  ];

  const calendars = [
    {
      id: "cal1",
      name: "기본",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
    {
      id: "cal2",
      name: "업무",
      color: "#ffffff",
      bgColor: "#ff5583",
      dragBgColor: "#ff5583",
      borderColor: "#ff5583",
    },
  ];

  const template = {
    time(event) {
      return `${event.title}`;
    },
  };

  const onClickEvent = (e) => {
    const { event } = e;
    alert(`${event.title} 클릭됨`);
  };

  const onBeforeCreateEvent = (eventData) => {
    const event = {
      id: String(Math.random()),
      calendarId: eventData.calendarId || "cal1",
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllDay ? "allday" : "time",
    };

    calendarRef.current.getInstance().createEvents([event]);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">캘린더</h2>
        <div className="space-x-2">
          {calendars.map((calendar) => (
            <span key={calendar.id} className="inline-flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: calendar.bgColor }}
              />
              {calendar.name}
            </span>
          ))}
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Calendar
          ref={calendarRef}
          height="600px"
          view="month"
          week={{
            startDayOfWeek: 0,
            workweek: true,
          }}
          useDetailPopup={true}
          useCreationPopup={true}
          template={template}
          calendars={calendars}
          events={initialEvents}
          onClickEvent={onClickEvent}
          onBeforeCreateEvent={onBeforeCreateEvent}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
