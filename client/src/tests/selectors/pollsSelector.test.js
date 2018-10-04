import getVisiblePolls from "../../selectors/pollsSelector";
import polls from "../fixtures/polls";

test("should get not voted polls with filter vote false", () => {
  const filters = {
    vote: false
  };
  const auth = {
    user: {
      id: "1"
    }
  };

  const notVoted = getVisiblePolls({ polls, filters, auth });
  expect(notVoted).toEqual([polls[2], polls[3], polls[4], polls[5]]);
});

test("should get voted polls with filter vote true", () => {
  const filters = {
    vote: true
  };
  const auth = {
    user: {
      id: "3"
    }
  };

  const voted = getVisiblePolls({ polls, filters, auth });
  expect(voted).toEqual([polls[0], polls[1], polls[3], polls[5]]);
});
