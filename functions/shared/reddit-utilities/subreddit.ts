import Snoowrap = require('snoowrap');
import { Submission, parseSubmission } from './submission';

export interface Subreddit {
  submissions: Submission[];
}

export async function parseSubreddit(
  input: Snoowrap.Subreddit
): Promise<Subreddit> {
  return {
    submissions: await Promise.all(
      (await input.getTop({ time: 'day' })).map(
        async (value: Snoowrap.Submission) => {
          return await parseSubmission(value, false);
        }
      )
    )
  };
}
