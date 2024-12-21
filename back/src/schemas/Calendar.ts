import mongoose from "mongoose";
import { CalendarType } from "../interfaces/Calendar";

const TimeSchema = new mongoose.Schema({
  end_at: {
    type: String,
    required: true,
  },
  start_at: {
    type: String,
    required: true,
  },
  all_day: {
    type: Boolean,
    default: false,
  },
});

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: TimeSchema,
    required: true,
  },
  location: String,
  description: String,
  rrule: Boolean,
  color: {
    type: String,
    default: "BLUE",
  },
});

const CalendarSchema = new mongoose.Schema<CalendarType>({
  claendar_id: {
    type: String,
    required: true,
  },
  event: {
    type: EventSchema,
    required: true,
  },
});

export default CalendarSchema;
