import axiosInstance from "./axiosInstance";

const getCalendar = async () => {
  const { data } = await axiosInstance.get("/calendar");
  return data;
};

const postCalendar = async ({ newCalendar }) => {
  const { data } = await axiosInstance.post("/calendar", newCalendar);
  return data;
};

/**특정 달(DATE 형식)로 받아오는 식으로 */
const getEvent = async ({ startDate, endDate }) => {
  const { data } = await axiosInstance.get(
    `/calendar/events?startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

const postEvent = async ({ newEvent }) => {
  const { data } = await axiosInstance.post("/calendar/event", newEvent);
  return data;
};
export { getCalendar, getEvent, postCalendar, postEvent };
