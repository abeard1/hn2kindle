import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';
import { Comment, CommentData } from './comment';

interface SubmissionData {
  title: string;
  author: string;
  body: string;
  comments?: CommentData[];
}

export class Submission {
  public static async parse(input: Snoowrap.Submission) {
    return new Submission({
      title: await input.title,
      author: await input.author.name,
      body: (await input.is_self)
        ? await input.selftext
        : await getContent(await input.url),
      comments: await Comment.parse(input.comments)
    });
  }

  constructor(private data: SubmissionData) {}
}
