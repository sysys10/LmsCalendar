import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("a");
});

export default router;
