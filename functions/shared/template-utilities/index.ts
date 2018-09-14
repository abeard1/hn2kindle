import handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Submission } from '../reddit-utilities/submission';

const commentPartial = readFileSync(
  resolve(__dirname, './static/partials/comment.hbs')
).toString();

export async function comments(data: Submission): Promise<string> {
  const path = resolve(__dirname, './static/comments.hbs');
  const file = readFileSync(path).toString();
  handlebars.registerPartial('comment', commentPartial);
  const template = handlebars.compile(file);
  return template(data);
}
