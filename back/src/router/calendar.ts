import express, { Response } from "express";
import RequestWithUser from "../interfaces/ResponseWithUser";
import { getEvents } from "../controller/calendarController";

const router = express.Router();

router.get("/events", getEvents);

export default router;
