import Snoowrap = require('snoowrap');
import { Submission, parseSubmission } from './submission';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

export interface Subreddit {
  name: string;
  submissions: Submission[];
  timespan: Timespan;
}

export async function parseSubreddit(
  input: Snoowrap.Subreddit,
  timespan: Timespan = 'day'
): Promise<Subreddit> {
  return {
    name: input.display_name,
    submissions: await Promise.all(
      (await input.getTop({ time: timespan })).map(
        async (value: Snoowrap.Submission) => {
          return await parseSubmission(value, false);
        }
      )
    ),
    timespan: timespan
  };
}
