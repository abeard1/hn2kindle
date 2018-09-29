import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import { Subreddit, getSubreddit } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { getSubredditPage } from '../shared/template-utilities';
import { SubredditRequest } from '../shared/models';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const request: SubredditRequest = req.body;

    const subreddit: Subreddit = await getSubreddit(request);
    const html: string = await getSubredditPage(subreddit);

    context.bindings.message = {
      ...context.bindings.message,
      personalizations: [{ to: [{ email: request.email }] }],
      subject: subreddit.name,
      attachments: [
        {
          content: Buffer.from(html).toString('base64'),
          filename: subreddit.name + '.html',
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
