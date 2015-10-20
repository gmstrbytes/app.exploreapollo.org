import React from "react";
import {
  IndexRoute,
  Route,
  Router
} from "react-router";

import {
  Dashboard,
  NoMatch,
  Moments,
  MomentViewer,
  Stories,
  StoryViewer,
  App
} from "./containers";

import "./scss/main.scss";

import createHistory from "history/lib/createHashHistory";
const history = createHistory({
  queryKey: false
});

React.render((
  <Router history={history}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="moments/moment/:id" component={MomentViewer}/>
      <Route path="moments" component={Moments}>
      </Route>
      <Route path="stories/story/:id" component={StoryViewer}/>
      <Route path="stories" component={Stories}>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body);
