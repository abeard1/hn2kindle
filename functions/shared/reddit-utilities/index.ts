import Snoowrap = require('snoowrap');

import { Submission } from './submission';

const r = new Snoowrap({
  userAgent: 'reddit2kindle by Jammie1',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

export const parseUrl = (url: string): string => {
  const regexp = new RegExp('(?<=comments/)(.*?)(?=/)');
  return regexp.exec(url)[0];
};

export const getSubmission = async (
  submissionId: string
): Promise<Submission> => {
  const snoowrapSubmission = r.getSubmission(submissionId);
  return Submission.parse(snoowrapSubmission);
};
