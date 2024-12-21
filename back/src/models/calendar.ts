import mongoose from "mongoose";
import CalendarSchema from "../schemas/Calendar";
import { CalendarType } from "../interfaces/Calendar";

export default mongoose.model<CalendarType>("Calendar", CalendarSchema);
