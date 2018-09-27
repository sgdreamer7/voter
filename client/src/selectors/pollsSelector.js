import { createSelector } from "reselect";

const getPolls = state => state.polls;
const getFilters = state => state.filters;
const getUser = state => state.auth.user;

const getVisiblePolls = createSelector(
  [getPolls, getFilters, getUser],
  (polls, filters, user) => {
    if (!polls.length) return polls;
    if (filters.vote) {
      let votedPolls = [];
      polls.forEach(poll => {
        for (let i = 0; i < poll.answers.length; i++) {
          let answer = poll.answers[i];
          let find = false;
          for (let j = 0; j < answer.voted.length; j++) {
            let vote = answer.voted[j];
            if (vote.toString() === user.id) {
              votedPolls.push(poll);
              find = true;
              break;
            }
          }
          if (find) break;
        }
      });
      return votedPolls;
    } else {
      let votedPolls = [];
      polls.forEach(poll => {
        if (!poll.answers.length) {
          votedPolls.push(poll);
        }
        for (let i = 0; i < poll.answers.length; i++) {
          let answer = poll.answers[i];
          if (!answer.voted.length) {
            votedPolls.push(poll);
            break;
          } else {
            let find = false;
            for (let j = 0; j < answer.voted.length; j++) {
              let vote = answer.voted[j];
              if (vote.toString() !== user.id) {
                votedPolls.push(poll);
                find = true;
                break;
              }
            }
            if (find) break;
          }
        }
      });
      return votedPolls;
    }
  }
);

export default getVisiblePolls;
