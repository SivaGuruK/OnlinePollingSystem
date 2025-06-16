const Poll = require("../models/poll");

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    const newPoll = await Poll.create({ question, options });
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.json(poll);
};

exports.votePoll = async (req, res) => {
  const { optionIndex } = req.body;
  const poll = await Poll.findById(req.params.id);
  poll.options[optionIndex].votes += 1;
  await poll.save();
  res.json(poll);
};

exports.getResults = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.json(poll.options);
};

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

