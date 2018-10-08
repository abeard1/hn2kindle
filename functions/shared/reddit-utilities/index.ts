import Snoowrap = require('snoowrap');

import { Submission, parseSubmission } from './models/submission';
import { Subreddit, parseSubreddit } from './models/subreddit';
import { SubredditRequest, SubmissionRequest, RefreshToken } from '../models';
import { getRedditClientId, getRedditClientSecret } from '../env';

export { Submission } from './models/submission';
export { Subreddit } from './models/subreddit';

const r = new Snoowrap({
  userAgent: 'reddit2kindle by Jammie1',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

const parseSubmissionUrl = (url: string): string => {
  const regexp = new RegExp('(?<=comments/)(.*?)(?=/)');
  return regexp.exec(url)[0];
};

export const getSubmission = async (
  request: SubmissionRequest
): Promise<Submission> => {
  const submissionId = parseSubmissionUrl(request.url);
  const snoowrapSubmission = r.getSubmission(submissionId);
  return parseSubmission(snoowrapSubmission, request.options);
};

export const getSubreddit = async (
  request: SubredditRequest
): Promise<Subreddit> => {
  const snoowrapSubmission = r.getSubreddit(request.name);
  return parseSubreddit(snoowrapSubmission, request.options);
};

export const getUser = async (refreshToken: RefreshToken): Promise<string> => {
  const userSnoowrap = new Snoowrap({
    userAgent: 'reddit2kindle',
    clientId: getRedditClientId(),
    clientSecret: getRedditClientSecret(),
    refreshToken: refreshToken
  });
  return userSnoowrap.getMe().name;
};
