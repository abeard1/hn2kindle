import Snoowrap = require('snoowrap');
import { getContent } from '../mercury-utilities';

interface SubmissionData {
  title: string;
  author: string;
  body: string;
  comments?: CommentData[];
}

export class Submission {
  public static async parse(input: Snoowrap.Submission) {
    const comments = await input.comments.fetchAll();
    console.log(comments[0].body);

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
