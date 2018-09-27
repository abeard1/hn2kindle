import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';
import { MailJSON } from '@sendgrid/helpers/classes/mail';

import { getSubreddit } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { getSubredditPage } from '../shared/template-utilities';
import { Subreddit } from '../shared/reddit-utilities/subreddit';
import { SubredditRequest } from '../shared/models';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const request: SubredditRequest = req.body;

    const subreddit: Subreddit = await getSubreddit(request);
    const html: string = await getSubredditPage(subreddit);

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

    return {
      status: HttpStatusCode.OK,
      body: html,
      headers: { 'content-type': 'text/html' }
    };
  } catch (e) {
    context.log.error(e);
    return handleGenericError(context, e.message);
  }
}
