import { Response } from "express";
import RequestWithUser from "../interfaces/ResponseWithUser";
import axios from "axios";
import { kakaoTokenRefresh } from "./kakoControler";
import { findRefreshTokenWithUserId } from "../services/userService";
import qs from "qs";
async function getEvents(req: RequestWithUser, res: Response) {
  try {
    const { startDate, endDate } = req.query;
    const { user_id } = req;
    const refreshToken = await findRefreshTokenWithUserId(user_id!);
    const kakao_access = await kakaoTokenRefresh(refreshToken!);
    console.log(startDate, endDate);

    const { data } = await axios.post(
      "https://kapi.kakao.com/v2/api/calendar/events",
      {
        headers: {
          Authorization: `Bearer ${kakao_access}`,
        },
      }
    );
    console.log(1);
  } catch (err) {
    console.log(2);
  }
}
export { getEvents };
