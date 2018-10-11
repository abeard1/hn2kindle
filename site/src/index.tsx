import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { IAppInfo } from './models/copyright-info';

const env = process.env;

const applicationInfo: IAppInfo = {
  applicationName: env.REACT_APP_APPLICATION_NAME || '',
  contactEmail: env.REACT_APP_CONTACT_EMAIL || '',
  copyrightName: env.REACT_APP_COPYRIGHT_NAME || '',
  copyrightUrl: env.REACT_APP_COPYRIGHT_URL || '',
  githubUrl: env.REACT_APP_GITHUB_URL || ''
};

ReactDOM.render(
  <App applicationInfo={applicationInfo} />,
  document.getElementById('root') as HTMLElement
);
