import { Response } from "express";
import { findRefreshTokenWithUserId } from "../services/userService";
import { CalendarType } from "../interfaces/Calendar";
import { CalendarService } from "../services/claendarService";
import RequestWithUser from "../interfaces/ResponseWithUser";
import { kakaoTokenRefresh } from "./kakoControler";
import { RequestHandler } from "express";
import calendar from "../models/calendar";

const calendarService = new CalendarService();
// GET - 일정 조회
export const getEvents: RequestHandler = async (req: RequestWithUser, res) => {
  try {
    console.log(getEvents);
    const { user_id } = req;
    const { startDate, endDate } = req.query;
    const refreshToken = await findRefreshTokenWithUserId(user_id!);
    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "리프레시 토큰이 존재하지 않습니다.",
      });
      return;
    }
    const events = await calendar.find({
      user_id: user_id,
      date: {
        $gte: new Date(startDate as string), // 시작일 이상
        $lte: new Date(endDate as string), // 종료일 이하
      },
    });
    console.log(events, 1);
  } catch (error) {
    console.error("캘린더 이벤트 조회 실패");
  }
};

// POST - 일정 생성
export const createEvent: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const { user_id } = req;
    const eventData: CalendarType = req.body;

    const refreshToken = await findRefreshTokenWithUserId(user_id!);
    const kakaoAccessToken = await kakaoTokenRefresh(refreshToken!);

    const result = await calendarService.createEvent(
      kakaoAccessToken!,
      eventData
    );
    res.status(201).json({
      success: true,
      data: result,
    });
    return;
  } catch (error) {
    console.error("캘린더 이벤트 생성 실패:", error);
    res.status(500).json({
      success: false,
      message: "일정 생성 중 오류가 발생했습니다.",
    });
    return;
  }
};

// PUT - 일정 수정
export const updateEvent: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const { user_id } = req;
    const { event_id } = req.params;
    const updateData = req.body;

    const refreshToken = await findRefreshTokenWithUserId(user_id!);
    const kakaoAccessToken = await kakaoTokenRefresh(refreshToken!);

    const result = await calendarService.updateEvent(
      kakaoAccessToken!,
      event_id,
      updateData
    );
    res.status(200).json({
      success: true,
      data: result,
    });
    return;
  } catch (error) {
    console.error("캘린더 이벤트 수정 실패:", error);
    res.status(500).json({
      success: false,
      message: "일정 수정 중 오류가 발생했습니다.",
    });
    return;
  }
};

// DELETE - 일정 삭제
export const deleteEvent: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const { user_id } = req;
    const { event_id } = req.params;

    const refreshToken = await findRefreshTokenWithUserId(user_id!);
    const kakaoAccessToken = await kakaoTokenRefresh(refreshToken!);

    const result = await calendarService.deleteEvent(
      kakaoAccessToken!,
      event_id
    );
    res.status(200).json({
      success: true,
      data: result,
    });
    return;
  } catch (error) {
    console.error("캘린더 이벤트 삭제 실패:", error);
    res.status(500).json({
      success: false,
      message: "일정 삭제 중 오류가 발생했습니다.",
    });
    return;
  }
};
