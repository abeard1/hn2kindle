import {
  Context,
  HttpResponse,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

export const handleMissingParameter = (
  context: Context,
  parameter: string
): HttpResponse => {
  return {
    status: HttpStatusCode.BadRequest,
    body: `Missing required parameter "${parameter}"`
  };
};

export const handleGenericError = (
  context: Context,
  message: string = ''
): HttpResponse => {
  if (message) {
    context.log.error(message);
  }

  return {
    status: HttpStatusCode.BadRequest,
    body: `Something went wrong. ${message}`.trim()
  };
};
