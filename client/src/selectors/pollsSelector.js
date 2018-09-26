import { createSelector } from "reselect";

const getPolls = state => state.polls;
const getFilters = state => state.filters;

const getVisiblePolls = createSelector(
  [getPolls, getFilters],
  (polls, filters) => {
    if (filters.vote) {
      return polls.filter(poll => poll.isVoted);
    } else {
      return polls.filter(poll => !poll.isVoted);
    }
  }
);

export default getVisiblePolls;
