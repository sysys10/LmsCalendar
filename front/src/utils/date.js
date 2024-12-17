import dayjs from "dayjs";

const getCurrentYear = () => {
  return dayjs().utcOffset(9).get("year");
};

const getCurrentMonth = () => {
  return dayjs().utcOffset(9).get("month");
};

const getCurrentDate = () => {
  return dayjs().utcOffset(9).get("date");
};

export { getCurrentYear, getCurrentMonth, getCurrentDate };
