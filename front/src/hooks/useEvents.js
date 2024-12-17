import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import useCalendarStore from "@stores/calendarStore";
import { getEvent } from "../apis/calendarApi";

const useCalendarEvents = () => {
  const queryClient = useQueryClient();
  const setEvents = useCalendarStore((state) => state.setEvents);

  const fetchEventsMutation = useMutation({
    mutationFn: (currentDate) => {
      const startDate = dayjs(currentDate)
        .startOf("month")
        .subtract(1, "week")
        .format("YYYY-MM-DD");
      const endDate = dayjs(currentDate)
        .endOf("month")
        .add(1, "week")
        .format("YYYY-MM-DD");

      return getEvent({ startDate, endDate });
    },

    onSuccess: (data, variables) => {
      setEvents(data);
      // 캐시 저장
      queryClient.setQueryData(
        ["events", dayjs(variables).format("YYYY-MM")],
        data
      );
    },
  });

  // 캐시 확인 후 데이터 가져오기
  const fetchEvents = async (date) => {
    const cacheKey = ["events", dayjs(date).format("YYYY-MM")];
    const cachedData = queryClient.getQueryData(cacheKey);

    if (cachedData) {
      setEvents(cachedData);
      return cachedData;
    }

    return fetchEventsMutation.mutateAsync(date);
  };

  return {
    fetchEvents,
    isFetchEventLoading: fetchEventsMutation.isLoading,
  };
};

export default useCalendarEvents;
