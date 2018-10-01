import {
  HttpResponse,
  HttpRequest,
  Context,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import axios from 'axios';
import { getRedditClientId, getRedditClientSecret } from '../shared/env';

interface IRedditResponse {
  error?: string;
  code: string;
  state: string;
}

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  const code = req.query.code;

  const jsonObject = await exchangeCodeForToken(code);

  return {
    status: HttpStatusCode.OK,
    body: ''
  };
}

const exchangeCodeForToken = async code => {
  const redditTokenUrl = 'https://www.reddit.com/api/v1/access_token';
  return await axios.post(
    redditTokenUrl,
    `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:7071/api/auth`,
    {
      auth: {
        username: getRedditClientId(),
        password: getRedditClientSecret()
      }
    }
  );
};
