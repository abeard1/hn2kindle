import * as React from 'react';

import { IAppInfo } from 'src/models/copyright-info';

export interface IPageProps {
  applicationInfo: IAppInfo;
}

export abstract class Page<
  T extends IPageProps,
  S = {}
> extends React.Component<T, S> {
  public render() {
    return (
      <div className={this.containerClass()}>
        {this._renderHeader()}
        {this._renderContent()}
      </div>
    );
  }

  protected abstract renderHeader(): JSX.Element | JSX.Element[];

  protected abstract renderContent(): JSX.Element | JSX.Element[];

  protected containerClass(): string {
    return 'page_container';
  }

  protected headerClass(): string {
    return 'page_header';
  }

  protected contentClass(): string {
    return 'page_content';
  }

  protected footerClass(): string {
    return 'page_footer';
  }

  private _renderHeader = () => {
    return <div className={this.headerClass()}>{this.renderHeader()}</div>;
  };

  private _renderContent = () => {
    return <div className={this.contentClass()}>{this.renderContent()}</div>;
  };
}

export default Page;
