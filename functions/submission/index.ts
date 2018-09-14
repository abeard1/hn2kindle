import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import { getSubmission, parseUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';
import { comments } from '../shared/template-utilities';

export async function run(context: Context, req: HttpRequest): Promise<any> {
  try {
    let res: HttpResponse;
    const submission = await getSubmission(parseUrl(req.body));
    const html = comments(submission);

    res = {
      status: HttpStatusCode.OK,
      body: await html,
      headers: { 'content-type': 'text/html' }
    };

    context.done(null, res);
  } catch (e) {
    context.log.error(e);
    handleGenericError(context, '');
  }
}
