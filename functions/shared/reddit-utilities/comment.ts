import Snoowrap = require('snoowrap');

export interface Comment {
  author: string;
  body: string;
  comments?: Comment[];
}

export async function parseComment(
  input: Snoowrap.Listing<Snoowrap.Comment>
): Promise<Comment[]> {
  return await Promise.all(
    (await input).map(async (value: Snoowrap.Comment) => {
      let comments: Comment[] = await parseComment(await value.replies);
      return {
        author: await value.author.name,
        body: await value.body_html,
        ...(comments.length ? { comments: comments } : {})
      };
    })
  );
}
