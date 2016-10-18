import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import TodoContainer from './components/TodoContainer';
import store from './redux/store';

import './style/fa.css';
import './style/bs.css';
import './style/custom.css';


const App = (
  <div className="mainApp">
    <div className="todos">
      <TodoContainer />
    </div>
  </div>
);

render(
  <Provider store={store}>
    {App}
  </Provider>,
  document.getElementById('app')
);
