import React from 'react';
import Router, { Route } from 'react-router';
import App from './components/App.jsx';
import Create from './components/Create.jsx';
import List from './components/List.jsx';
import Question from './components/Question.jsx';

var routes = (
  <Route handler={App}>
    <Route name='create' path='/create' handler={Create} />
    <Route name='list' path='/' handler={List} />
    <Route name='question' path='/questions/:questionId' handler={Question} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  console.log('route', state);
  React.render(<Handler />, document.body);
});
