import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import WebSocketNotifications from 'components/WebSocketNotifications';
import LandingPage from 'screens/Landing/containers/LandingPage';
import PublicRoute from 'components/PublicRoute';
import Data from 'screens/Home/containers/Data';
import Header, { User } from '../../components/Header';
import Settings from 'screens/AuthorSettings/containers/Settings';
import AddCourse from '../../screens/AddCourse/containers/AddCoursePage';
import { AddPathPage } from '../../screens/AddPath/containers/AddPathPage';
import LoginPage from '../../screens/Authentication/containers/LoginPage';
import handler from '../../components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import MainStudentPage from '../../screens/MainPage/containers/MainStudentPage';
import MainAuthorPage from '../../screens/AuthorMainPage/containers/MainPage';

export interface IRoutingProps {
  isLoading: boolean;
}

const mock: User = {
  id: '1',
  name: 'name',
  avatar: 'https://media1.tenor.com/images/6f4fa5fea73897955d4b0508c47eeca5/tenor.gif?itemid=14645687',
  role: 'STUDENT'
};

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => (
  <div>
    {/* {isAuthorized ? <Header /> : ''} */}
    <Header currentUser={mock} />
    <Switch>
      <PublicRoute exact path="/public" component={Data} />
      <PublicRoute exact path="/settings" component={Settings} />
      <PublicRoute exact path="/" component={LandingPage} />
      <PublicRoute exact path="/public" component={Data} />
      <PublicRoute exact path="/login" component={LoginPage} />
      <PublicRoute exact path="/public" component={Data} />
      <PublicRoute exact path="/add_path" component={AddPathPage} />
      <PublicRoute exact path="/landing" component={LandingPage} />
      <PublicRoute exact path="/add_course" component={AddCourse} />
      <PublicRoute exact path="/main" component={mock.role === 'STUDENT' ? MainStudentPage : MainAuthorPage} />
      <PublicRoute exact path="/oauth/redirect" component={handler} />
      <div>
        <LoaderWrapper loading={isLoading}>
          <Switch>
            {/* <PrivateRoute
              exact
              path="/private"
              component={Private}
            /> */}
            <Route path="/*">
              <Redirect to="/public" />
            </Route>
          </Switch>
        </LoaderWrapper>
      </div>
    </Switch>
    <WebSocketNotifications user={{ username: 'aab' }} />
  </div>
);

export default Routing;
