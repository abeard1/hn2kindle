import {
  Context,
  HttpRequest,
  HttpStatusCode,
  HttpResponse
} from 'azure-functions-ts-essentials';
import { MailJSON } from '@sendgrid/helpers/classes/mail';

import { getSubmission, parseSubmissionUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { comments } from '../shared/template-utilities';
import { Submission } from '../shared/reddit-utilities/submission';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const id: string = parseSubmissionUrl(req.body);

    const submission: Submission = await getSubmission(id);
    const html: string = await comments(submission);

    context.bindings.message = {
      ...context.bindings.message,
      personalizations: [{ to: [{ email: 'jamie.magee@gmail.com' }] }],
      subject: submission.title,
      attachments: [
        {
          content: Buffer.from(html).toString('base64'),
          filename: submission.title + '.html',
          type: 'text/html'
        }
      ],
      content: [{ type: 'text/plain', value: ' ' }]
    };

    return {
      status: HttpStatusCode.NoContent,
      body: null
    };
  } catch (e) {
    context.log.error(e);
    return handleGenericError(context, e.message);
  }
}
