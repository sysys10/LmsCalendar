import express from "express";
import { process } from "../controller/openAiController";

const router = express.Router();

router.post("/", process);

export default router;
