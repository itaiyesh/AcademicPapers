import React, { Component } from 'react';
// import { Router } from 'react-router-dom';
import { Router } from 'react-router-dom'

import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from '../helpers';
import theme from '../theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../assets/scss/index.scss';
import validators from '../common/validators';
import { Routes } from './Routes';

//TODO: Remove:
// import { initializeFirebase, askForPermissioToReceiveNotifications } from './push';
// initializeFirebase();
// askForPermissioToReceiveNotifications();

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {
  render() {

    const { data } = this.props.data

    console.log(data);
    
    return (
      <ThemeProvider theme={theme}>

        <Router history={browserHistory}>
          <Routes />
         </Router>
      </ThemeProvider>
    );
  }
}

export default App
