import Snoowrap = require('snoowrap');

export interface Comment {
  author: string;
  op: boolean;
  body: string;
  comments?: Comment[];
}

export async function parseComment(
  input: Snoowrap.Listing<Snoowrap.Comment>,
  opName: string
): Promise<Comment[]> {
  return Promise.all(
    (await input).map(async (value: Snoowrap.Comment) => {
      let comments: Comment[] = await parseComment(await value.replies, opName);
      const author = await value.author.name;
      return {
        author: author,
        op: opName === author,
        body: await value.body_html,
        ...(comments.length ? { comments: comments } : {})
      };
    })
  );
}
