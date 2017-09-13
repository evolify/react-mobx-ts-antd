import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './model'
import Index from './view/Index';
import {Provider} from 'mobx-react';
ReactDOM.render(
  <Provider {...store}>
    <Index name="abc"/>
  </Provider>,
  document.getElementById('app') as HTMLElement
);