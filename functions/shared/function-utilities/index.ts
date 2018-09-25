import { Context, HttpResponse } from 'azure-functions-ts-essentials';

export const handleMissingParameter = (
  context: Context,
  parameter: string
): HttpResponse => {
  return {
    status: 400,
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
    status: 400,
    body: `Something went wrong. ${message}`.trim()
  };
};
