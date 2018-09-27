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
  return {
    title: await input.title,
    author: await input.author.name,
    body: (await input.is_self)
      ? await input.selftext_html
      : await getContent(await input.url),
    ...(options.comments
      ? { comments: await parseComment(await input.comments) }
      : {})
  };
}
