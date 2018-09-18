import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import { getSubmission, parseUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { comments } from '../shared/template-utilities';
import { sendMail } from '../shared/email-utilities';
import { Submission } from '../shared/reddit-utilities/submission';
import { SentMessageInfo } from 'nodemailer';

export async function run(context: Context, req: HttpRequest): Promise<void> {
  try {
    const id: string = parseUrl(req.body);

    const submission: Submission = await getSubmission(id);
    const html: string = await comments(submission);
    await sendMail(submission, html);

  } catch (e) {
    context.log.error(e);
    handleGenericError(context, '');
  }
}
