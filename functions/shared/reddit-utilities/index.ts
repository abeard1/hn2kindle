import Snoowrap = require('snoowrap');

import { Submission, parseSubmission } from './submission';
import { Subreddit, parseSubreddit } from './subreddit';
import { SubredditRequest, SubmissionRequest } from '../models';

export { Submission } from './submission';
export { Subreddit } from './subreddit';

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
