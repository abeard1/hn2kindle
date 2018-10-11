import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Book from '@material-ui/icons/Book';
import * as React from 'react';
import Page, { IPageProps } from '../page';
import { styles } from './styles';

class LandingPage extends Page<IPageProps> {
  protected renderContent(): JSX.Element | JSX.Element[] {
    return <p />;
  }
  protected renderHeader() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap={true}>
            <Book />
            reddit2kindle
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(LandingPage);
