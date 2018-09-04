import {
  Context,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import { getSubmission, parseUrl } from '../shared/reddit-utilities';
import { handleGenericError } from '../shared/function-utilities';

export async function run(context: Context, req: HttpRequest): Promise<any> {
  try {
    let res: HttpResponse;
    const submission = getSubmission(parseUrl(req.body));

    res = {
      status: HttpStatusCode.OK,
      body: await submission
    };

    context.done(null, res);
  } catch (e) {
    context.log.error(e);
    handleGenericError(context, '');
  }
}
