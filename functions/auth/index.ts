import {
  HttpResponse,
  HttpRequest,
  Context,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  return {
    status: HttpStatusCode.OK,
    body: ''
  };
}
