import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';
import { parseComment, Comment } from './comment';
import { Options } from '../models';

export interface Submission {
  title: string;
  author: string;
  body: string;
  comments?: Comment[];
}

export async function parseSubmission(
  input: Snoowrap.Submission,
  options: Options
): Promise<Submission> {
  const op = await input.author.name;
  return {
    title: await input.title,
    author: op,
    body: (await input.is_self)
      ? await input.selftext_html
      : await getContent(await input.url),
    ...(options.comments
      ? {
          comments: await parseComment(
            await input.comments.fetchMore({ amount: 25 }),
            op
          )
        }
      : {})
  };
}
