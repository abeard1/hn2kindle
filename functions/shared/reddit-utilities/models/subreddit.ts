import Snoowrap = require('snoowrap');
import { Submission, parseSubmission } from './submission';
import { Timespan, SubredditOptions } from '../../models';

export interface Subreddit {
  name: string;
  submissions: Submission[];
  timespan: Timespan;
}

export async function parseSubreddit(
  input: Snoowrap.Subreddit,
  options: SubredditOptions
): Promise<Subreddit> {
  return {
    name: input.display_name,
    submissions: await Promise.all(
      (await input.getTop({ time: options.timespan })).map(
        (value: Snoowrap.Submission) => {
          return parseSubmission(value, options);
        }
      )
    ),
    timespan: options.timespan
  };
}
