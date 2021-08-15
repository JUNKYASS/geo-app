import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools() // Для того, чтобы работал редакс девтулс в браузере, параметрами передаются мидлвейры
);

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.querySelector('#app'));