import { CalendarType } from "../interfaces/Calendar";
import Calendar from "../models/calendar";
import axios from "axios";

export class CalendarService {
  // 기존 getEvents 함수는 유지
  async getEvents(
    kakaoAccessToken: string,
    startDate: string,
    endDate: string
  ) {
    try {
      console.log(startDate, endDate);

      const { data } = await axios.get<{ events: CalendarType[] }>(
        "https://kapi.kakao.com/v2/api/calendar/events",
        {
          params: {
            start_at: startDate,
            end_at: endDate,
          },
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(data.events);
      return data.events;
    } catch (error) {
      throw error;
    }
  }

  // 캘린더 이벤트 생성
  async createEvent(kakaoAccessToken: string, calendarData: CalendarType) {
    try {
      const { data } = await axios.post(
        "https://kapi.kakao.com/v2/api/calendar/create/event",
        calendarData,
        {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      // MongoDB에도 저장
      await Calendar.create(calendarData);

      return data;
    } catch (error) {
      throw error;
    }
  }

  // 캘린더 이벤트 수정
  async updateEvent(
    kakaoAccessToken: string,
    event_id: string,
    updateData: Partial<CalendarType>
  ) {
    try {
      const { data } = await axios.post(
        "https://kapi.kakao.com/v2/api/calendar/update/event/host",
        {
          event_id,
          ...updateData,
        },
        {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      // MongoDB 데이터도 업데이트
      await Calendar.findByIdAndUpdate(event_id, updateData, { new: true });

      return data;
    } catch (error) {
      throw error;
    }
  }

  // 캘린더 이벤트 삭제
  async deleteEvent(kakaoAccessToken: string, event_id: string) {
    try {
      const { data } = await axios.delete(
        "https://kapi.kakao.com/v2/api/calendar/delete/event",
        {
          params: { event_id },
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      // MongoDB에서도 삭제
      await Calendar.findByIdAndDelete(event_id);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
