import Snoowrap = require('snoowrap');

import { Submission, parseSubmission } from './submission';
import { Subreddit as _Subreddit, parseSubreddit } from './subreddit';
import { SubredditRequest, SubmissionRequest } from '../models';

const r = new Snoowrap({
  userAgent: 'reddit2kindle by Jammie1',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

r.config({
  debug: true
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
): Promise<_Subreddit> => {
  const snoowrapSubmission = r.getSubreddit(request.name);
  return parseSubreddit(snoowrapSubmission, request.options);
};
