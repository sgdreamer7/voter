const express = require("express");
const router = express.Router();
const Answer = require("../../models/Answers");
const Polls = require("../../models/Polls");
const passport = require("passport");

const validateAnswerInput = require("../../validations/answer");

router.get("/", (req, res) => {
  Answer.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(404).json({ error: "No answers found" }));
});

router.post(
  "/:poll_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateAnswerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Polls.findById(req.params.poll_id).then(poll => {
      const newAnswer = new Answer({
        answer: req.body.answer,
        order: req.body.order
      })
        .save()
        .then(answer => {
          poll.answers.push(answer);

          poll.save().then(poll => res.json(answer));
        });
    });
  }
);

router.patch(
  "/:answer_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateAnswerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newData = {
      answer: req.body.answer,
      order: req.body.order
    };

    Answer.findOneAndUpdate(
      { _id: req.params.answer_id },
      { $set: newData },
      { new: true }
    ).then(answer => res.json(answer));
  }
);

router.delete(
  "/:answer_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Answer.findOneAndRemove({ _id: req.params.answer_id }).then(answer => {
      if (answer) {
        Polls.findById(answer.poll).then(poll => {
          poll.answers = poll.answers.filter(
            item => item.toString() !== req.params.answer_id
          );

          poll.save().then(poll => {
            return res.json({ success: true, answer });
          });
        });
      } else {
        res.status(404).json({ error: "No found" });
      }
    });
  }
);

module.exports = router;
