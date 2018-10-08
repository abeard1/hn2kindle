import handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Submission } from '../reddit-utilities';
import { Subreddit } from '../reddit-utilities';

const submissionPartial = readFileSync(
  resolve(__dirname, './static/partials/submission.hbs')
).toString();

const commentPartial = readFileSync(
  resolve(__dirname, './static/partials/comment.hbs')
).toString();

export async function getSubmissionPage(data: Submission): Promise<string> {
  const path = resolve(__dirname, './static/submission.hbs');
  const file = readFileSync(path).toString();

  handlebars.registerPartial('comment', commentPartial);
  const template = handlebars.compile(file);
  return template(await data);
}

export async function getSubredditPage(data: Subreddit): Promise<string> {
  const path = resolve(__dirname, './static/subreddit.hbs');
  const file = readFileSync(path).toString();

  handlebars.registerPartial('submission', submissionPartial);
  handlebars.registerPartial('comment', commentPartial);
  const template = handlebars.compile(file);
  return template(await data);
}
