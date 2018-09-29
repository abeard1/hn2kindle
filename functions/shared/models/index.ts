export enum Timespan {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  All = 'all'
}

export interface Options {
  comments: boolean;
  commentsStyle: 'numbers' | 'quotes';
}

export interface SubmissionRequest {
  url: string;
  email: string;
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
