import * as React from 'react';
import './App.css';

import { IAppInfo } from './models/copyright-info';
import LandingPage from './pages/landing';

interface IAppProps {
  applicationInfo: IAppInfo;
}

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  public render() {
    const mainContent = this.renderLandingPage();
    return <React.Fragment>{mainContent}</React.Fragment>;
  }

  private renderLandingPage(): any {
    return <LandingPage applicationInfo={this.props.applicationInfo} />;
  }
}

export default App;
