export enum Timespan {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month'
}

export interface Options {
  comments: boolean;
  commentsStyle: 'numbers' | 'quotes';
}

export interface SubmissionRequest {
  url: string;
  options: Options;
}

export interface SubredditOptions extends Options {
  timespan: Timespan;
  numberOfPosts: number;
}

export interface SubredditRequest {
  name: string;
  email: string;
  options: SubredditOptions;
}
