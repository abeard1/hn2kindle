import {
  HttpResponse,
  HttpRequest,
  Context,
  HttpStatusCode
} from 'azure-functions-ts-essentials';

import axios from 'axios';
import { getRedditClientId, getRedditClientSecret } from '../shared/env';
import { RefreshToken, IRedditResponse } from '../shared/models';
import { DataProvider } from '../shared/data-provider';
import { getUser } from '../shared/reddit-utilities';

export async function run(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  const code = req.query.code;

  const redditResponse: IRedditResponse = await exchangeCodeForToken(code);

  const dataProvider = new DataProvider();
  await dataProvider.init();

  const username = await getUser(redditResponse.refresh_token);

  dataProvider.storeUserIdForToken(redditResponse.refresh_token, username);

  return {
    status: HttpStatusCode.Redirect,
    body: '',
    headers: {
      location: 'https://reddit.com'
    }
  };
}

const exchangeCodeForToken = async (code: string): Promise<IRedditResponse> => {
  const redditTokenUrl = 'https://www.reddit.com/api/v1/access_token';
  return (await axios.post(
    redditTokenUrl,
    `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:7071/api/auth`,
    {
      auth: {
        username: getRedditClientId(),
        password: getRedditClientSecret()
      }
    }
  )).data;
};
