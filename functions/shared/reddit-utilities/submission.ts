import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';

interface CommentData {
  author: string;
  body: string;
}

interface SubmissionData {
  title: string;
  author: string;
  body: string;
  comments?: Comment[];
}

export class Submission {
  public static async parse(input: Snoowrap.Submission) {
    return new Submission({
      title: await input.title,
      author: await input.author.name,
      body: (await input.is_self)
        ? await input.selftext_html
        : await getContent(await input.url)
    });
  }

  constructor(private data: SubmissionData) {}
}
