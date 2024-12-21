interface TimeType {
  end_at: string;
  start_at: string;
  all_day: boolean;
}

interface EventType {
  title: string;
  time: TimeType;
  location?: string;
  description?: string;
  rrule?: boolean;
  color: string;
}

interface CalendarType {
  claendar_id: string;
  event: EventType;
}

export type { CalendarType, EventType, TimeType };
