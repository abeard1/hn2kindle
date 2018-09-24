import { Context, HttpRequest } from 'azure-functions-ts-essentials';
import { MailJSON } from '@sendgrid/helpers/classes/mail';

import { getSubmission, parseUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { comments } from '../shared/template-utilities';
import { Submission } from '../shared/reddit-utilities/submission';

export async function run(
  context: Context,
  req: HttpRequest,
  message: MailJSON
): Promise<MailJSON> {
  try {
    const id: string = parseUrl(req.body);

    const submission: Submission = await getSubmission(id);
    const html: string = await comments(submission);
    return {
      ...message,
      personalizations: [
        {
          to: [
            {
              email: 'jamie.magee@gmail.com'
            }
          ]
        }
      ],
      subject: submission.title,
      attachments: [
        {
          content: Buffer.from(html).toString('base64'),
          filename: submission.title + '.html',
          type: 'text/html'
        }
      ],
      content: [
        {
          type: 'text/plain',
          value: ' '
        }
      ]
    };
  } catch (e) {
    context.log.error(e);
    handleGenericError(context, '');
  }
}
