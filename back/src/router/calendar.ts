import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/calendarController";

const router = express.Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.put("/events/:event_id", updateEvent);
router.delete("/events/:event_id", deleteEvent);

export default router;
