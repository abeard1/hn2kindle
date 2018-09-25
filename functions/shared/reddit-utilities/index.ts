import Snoowrap = require('snoowrap');

import { Submission, parseSubmission } from './submission';
import { Subreddit, parseSubreddit } from './subreddit';

const r = new Snoowrap({
  userAgent: 'reddit2kindle by Jammie1',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

export const parseSubmissionUrl = (url: string): string => {
  const regexp = new RegExp('(?<=comments/)(.*?)(?=/)');
  return regexp.exec(url)[0];
};

export const parseSubredditUrl = (url: string): string => {
  const regexp = new RegExp('(?<=r/)(.*?)(?=(/|$))');
  return regexp.exec(url)[0];
};

export const getSubmission = async (
  submissionId: string
): Promise<Submission> => {
  const snoowrapSubmission = r.getSubmission(submissionId);
  return parseSubmission(snoowrapSubmission);
};

export const getSubreddit = async (subreddit: string): Promise<Subreddit> => {
  const snoowrapSubmission = r.getSubreddit(subreddit);
  return parseSubreddit(snoowrapSubmission);
};
