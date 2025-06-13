const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPoll,
  votePoll,
  getResults,
} = require("../controllers/pollController");

router.post("/polls", createPoll);
router.get("/polls/:id", getPoll);
router.post("/polls/:id/vote", votePoll);
router.get("/polls/:id/results", getResults);

module.exports = router;
