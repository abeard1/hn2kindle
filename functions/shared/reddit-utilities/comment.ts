import Snoowrap = require('snoowrap');

export interface CommentData {
  author: string;
  body: string;
  children?: CommentData[];
}

export class Comment {
  public static async parse(
    input: Snoowrap.Listing<Snoowrap.Comment>
  ): Promise<CommentData[]> {
    return await Promise.all(
      (await input.fetchAll()).map(async (value: Snoowrap.Comment) => {
        return {
          author: await value.author.name,
          body: await value.body,
          children: await Comment.parse(await value.replies)
        };
      })
    );
  }
}
