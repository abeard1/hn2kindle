import Snoowrap = require('snoowrap');
import { URL } from 'url';

const r = new Snoowrap({
  userAgent: 'reddit2kindle by /u/Jammie1',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

r.config({
  proxies: false
})

export const getSubmission = (submissionId: string): Snoowrap.Submission => {
  const submission = r.getSubmission(submissionId);
  return submission;
};
