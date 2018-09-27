import {
  Context,
  HttpRequest,
  HttpStatusCode,
  HttpResponse
} from 'azure-functions-ts-essentials';

import { getSubmission } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { getSubmissionPage } from '../shared/template-utilities';
import { Submission } from '../shared/reddit-utilities/submission';
import { SubmissionRequest } from '../shared/models';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const request: SubmissionRequest = req.body;

    const submission: Submission = await getSubmission(request);
    const html: string = await getSubmissionPage(submission);

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
