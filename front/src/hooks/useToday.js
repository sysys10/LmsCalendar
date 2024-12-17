import dayjs from "dayjs";

const getToday = () => {
  return dayjs().utcOffset(9).get("date");
};
