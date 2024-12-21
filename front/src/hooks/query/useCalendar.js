import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axiosInstance";
import { getCalendar, getEvent } from "../apis/calendarApi";

const useCalendar = () => {
  const calendarMutation = useMutation({
    mutationFn: getCalendar,
    mutationKey: ["calendar"],
    onSuccess: (data) => {},
  });

  const eventMutation = useMutation({
    mutationFn: getEvent,
    mutationKey: ["calendar", "event"],
    onSuccess: (data) => {},
  });
};
