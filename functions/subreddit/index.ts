import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';
import { MailJSON } from '@sendgrid/helpers/classes/mail';

import { getSubreddit, parseSubredditUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { comments } from '../shared/template-utilities';
import { Subreddit } from '../shared/reddit-utilities/subreddit';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const id: string = parseSubredditUrl(req.body);

    const subreddit: Subreddit = await getSubreddit(id);
    // const html: string = await comments(submission);

    // context.bindings.message = {
    //   ...context.bindings.message,
    //   personalizations: [{ to: [{ email: 'jamie.magee@gmail.com' }] }],
    //   subject: submission.title,
    //   attachments: [
    //     {
    //       content: Buffer.from(html).toString('base64'),
    //       filename: submission.title + '.html',
    //       type: 'text/html'
    //     }
    //   ],
    //   content: [{ type: 'text/plain', value: ' ' }]
    // };

    return { status: HttpStatusCode.OK, body: subreddit };
  } catch (e) {
    context.log.error(e);
    return handleGenericError(context, e.message);
  }
}
