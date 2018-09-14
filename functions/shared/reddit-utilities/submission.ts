import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';
import { Comment, CommentData } from './comment';

export interface Submission {
  title: string;
  author: string;
  body: string;
  comments?: CommentData[];
}

export async function parse(input: Snoowrap.Submission): Promise<Submission> {
  return {
    title: await input.title,
    author: await input.author.name,
    body: (await input.is_self)
      ? await input.selftext_html
      : await getContent(await input.url),
    comments: await Comment.parse(input.comments)
  };
}
