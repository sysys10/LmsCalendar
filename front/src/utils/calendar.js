const getCalendarPath = () => {
  return `/calendar/month/${getCurrentYear()}/${getCurrentMonth()}/${getCurrentDate()}`;
};

export { getCalendarPath };
