import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';
import { parseComment, CommentData } from './comment';

export interface Submission {
  title: string;
  author: string;
  body: string;
  comments?: CommentData[];
}

export async function parseSubmission(
  input: Snoowrap.Submission,
  getComments: boolean = true
): Promise<Submission> {
  return {
    title: await input.title,
    author: await input.author.name,
    body: (await input.is_self)
      ? await input.selftext_html
      : await getContent(await input.url),
    ...(getComments ? { comments: await parseComment(input.comments) } : {})
  };
}
