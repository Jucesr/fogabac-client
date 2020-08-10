import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routes/';
import * as serviceWorker from './serviceWorker';

import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

// Add this import:
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import configureStore from './store/';

const store = configureStore();

const Root = () => (
  <AppContainer>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </AppContainer>

)

// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



// Render once
render();

// // Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./routes/', () => {
//     render();
//   });
// }

