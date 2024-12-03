import { useCallback, useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { TZDate } from "@toast-ui/calendar";

export default function MyCalendar() {
  const calendarRef = useRef(null);
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDateRangeText, setSelectedDateRangeText] = useState("");
  const initialEvents = [
    {
      id: "1",
      calendarId: "personal",
      title: "알고리즘 분석",
      category: "time",
      start: new TZDate("2024-12-03T16:00:00"),
      end: new TZDate("2024-12-03T18:00:00"),
      backgroundColor: "rgb(191,219,254)",
    },
    {
      id: "2",
      calendarId: "personal",
      title: "시험기간",
      category: "time",
      start: new TZDate("2024-12-08T16:00:00"),
      end: new TZDate("2024-12-16T18:00:00"),
      backgroundColor: "rgb(191,219,254)",
    },
  ];
  const calendars = [
    {
      id: "kakao",
      name: "카카오톡",
      color: "#000000",
      bgColor: "#FEE500",
      dragBgColor: "#FEE500",
      borderColor: "#FEE500",
    },
    {
      id: "personal",
      name: "개인",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
  ];

  const getCalInstance = useCallback(() => {
    return calendarRef.current?.getInstance?.();
  }, []);

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText("");
      return;
    }

    const viewName = calInstance.getViewName();
    const calDate = calInstance.getDate();
    const rangeStart = calInstance.getDateRangeStart();
    const rangeEnd = calInstance.getDateRangeEnd();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText = "";

    switch (viewName) {
      case "month": {
        dateRangeText = `${year}-${month}`;
        break;
      }
      case "week": {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}-${month < 10 ? "0" : ""}${month}-${date < 10 ? "0" : ""}${date}`;
        const end = `${year}-${endMonth < 10 ? "0" : ""}${endMonth}-${endDate < 10 ? "0" : ""}${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}-${month}-${date}`;
    }

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, updateRenderRangeText]);

  const onClickNavi = (action) => {
    const calInstance = getCalInstance();
    switch (action) {
      case "today":
        calInstance.today();
        break;
      case "prev":
        calInstance.prev();
        break;
      case "next":
        calInstance.next();
        break;
      default:
        break;
    }
    updateRenderRangeText();
  };

  const onBeforeCreateEvent = (eventData) => {
    const event = {
      calendarId: eventData.calendarId || "personal",
      id: String(Math.random()),
      title: eventData.title,
      isAllday: eventData.isAllday,
      start: eventData.start,
      end: eventData.end,
      category: eventData.isAllday ? "allday" : "time",
      dueDateClass: "",
      location: eventData.location,
      state: eventData.state,
      isPrivate: eventData.isPrivate,
      backgroundColor: "rgb(191,219,254)",
    };

    getCalInstance().createEvents([event]);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            일정 관리
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="month">월간</option>
              <option value="week">주간</option>
              <option value="day">일간</option>
            </select>
            <button
              onClick={() => onClickNavi("today")}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              오늘
            </button>
            <button
              onClick={() => onClickNavi("prev")}
              className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={() => onClickNavi("next")}
              className="p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              →
            </button>
            <span className="text-gray-600">{selectedDateRangeText}</span>
            <div className="flex flex-wrap gap-3">
              {calendars.map((calendar) => (
                <div
                  key={calendar.id}
                  className="flex items-center px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: calendar.bgColor + "20" }}
                >
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: calendar.bgColor }}
                  />
                  <span style={{ color: calendar.borderColor }}>
                    {calendar.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl shadow-lg overflow-hidden">
          <Calendar
            ref={calendarRef}
            height="700px"
            view={selectedView}
            week={{
              startDayOfWeek: 0,
              workweek: false,
              hourStart: 7,
              hourEnd: 24,
            }}
            month={{
              startDayOfWeek: 0,
            }}
            events={initialEvents} // 여기 추가
            useDetailPopup={true}
            useFormPopup={true}
            calendars={calendars}
            onBeforeCreateEvent={onBeforeCreateEvent}
          />
        </div>
      </div>
    </div>
  );
}
