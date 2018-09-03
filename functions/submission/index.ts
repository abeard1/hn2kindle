import Snoowrap = require('snoowrap');
import {
  Context,
  HttpRequest,
  HttpMethod
} from 'azure-functions-ts-essentials';

import { getSubmission } from '../shared/reddit-utilities';

export function run(context: Context, req: HttpRequest) {
  try {
    const submissionId = req.body;
    const submission = getSubmission(submissionId);

    const title = submission.title;

    context.done();
  } catch (e) {
    context.log.error(e);
  }
}
