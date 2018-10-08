import * as azure from 'azure-storage';
import { getConnectionString } from '../env';
import { TokenToUsernameModel, RefreshToken, Username } from '../models';

export interface ErrorResultResponse<T> {
  error: Error;
  result: T;
  response: azure.ServiceResponse;
}

export class DataProvider {
  private static TABLE_NAME = 'reddit2kindle';
  private storage: azure.TableService;

  public async init() {
    const credentials = getConnectionString();
    this.storage = azure.createTableService(credentials);
    return new Promise<ErrorResultResponse<azure.TableService.TableResult>>(
      (resolve, reject) => {
        this.storage.createTableIfNotExists(
          DataProvider.TABLE_NAME,
          (error, result, response) => {
            resolve({ error, result, response });
          }
        );
      }
    );
  }

  public storeUserIdForToken = async (
    refreshToken: RefreshToken,
    userId: Username
  ): Promise<void> => {
    const tokenToUserIdEntity = TokenToUsernameModel.toEntity(
      refreshToken,
      userId
    );

    await this.storeEntity(tokenToUserIdEntity);
  };

  private async storeEntity<T>(entity: T) {
    return new Promise<ErrorResultResponse<azure.TableService.EntityMetadata>>(
      (resolve, reject) => {
        this.storage.insertOrReplaceEntity<T>(
          DataProvider.TABLE_NAME,
          entity,
          (error, result, response) => {
            resolve({ error, result, response });
          }
        );
      }
    );
  }
}
