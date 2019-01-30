import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Pessoa from './Pessoa';
import Evento from './Evento';
import Score from './Score';
import Home from './Home';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';

ReactDOM.render(
  (<Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/pessoas" component={Pessoa}/>
          <Route path="/eventos" component={Evento}/>
          <Route path="/scores" component={Score}/>
      </Route>
  </Router>),
  document.getElementById('root')
);