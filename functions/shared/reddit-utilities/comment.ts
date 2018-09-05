import Snoowrap = require('snoowrap');

interface CommentData {
  author: string;
  body: string;
  children?: CommentData[];
}

export class Comment {
  public static async traverse(input: Snoowrap.Listing<Snoowrap.Comment>) {
    
  }
}
