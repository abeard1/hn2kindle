import { TableUtilities } from 'azure-storage';

export type RefreshToken = string;
export type Username = string;

export enum PartitionKeys {
  TokenToUser = 'tokenToUser'
}

export interface IRedditResponse {
  access_token: string;
  expires_in: number;
  refresh_token: RefreshToken;
  scope: string;
  token_type: string;
}

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

const entGen = TableUtilities.entityGenerator;

export interface UsernameToTokenBindingEntity {
  PartitionKey: string;
  RowKey: string;
  RefreshToken: string;
}

export interface TokenToUsernameBindingEntity {
  PartitionKey: string;
  RowKey: string;
  Username: string;
}

export interface TokenToUsernameEntity {
  PartitionKey: TableUtilities.entityGenerator.EntityProperty<string>;
  RowKey: TableUtilities.entityGenerator.EntityProperty<string>;
  Username: TableUtilities.entityGenerator.EntityProperty<string>;
}

export class TokenToUsernameModel {
  constructor(public refreshToken: RefreshToken, public userId: Username) {}

  public static fromBindingEntity(
    entity: TokenToUsernameBindingEntity
  ): TokenToUsernameModel {
    return new TokenToUsernameModel(entity.RowKey, entity.Username);
  }

  public static fromEntity(
    entity: TokenToUsernameEntity
  ): TokenToUsernameModel {
    return new TokenToUsernameModel(entity.RowKey._, entity.Username._);
  }

  public static toEntity(
    refreshToken: RefreshToken,
    userId: Username
  ): TokenToUsernameEntity {
    return {
      PartitionKey: entGen.String(String(PartitionKeys.TokenToUser)),
      RowKey: entGen.String(refreshToken),
      Username: entGen.String(userId)
    };
  }
}
