import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import WebSocketNotifications from 'components/WebSocketNotifications';
import LandingPage from 'screens/Landing/containers/LandingPage';
import PublicRoute from 'components/PublicRoute';
import Data from 'screens/Home/containers/Data';
import Header, { User } from '../../components/Header';
import AuthorSettings from 'screens/AuthorSettings/containers/Settings';
import StudentSettings from 'screens/StudentSettings/containers/Settings';
import AddCourse from '../../screens/AddCourse/containers/AddCoursePage';
import { AddPathPage } from '../../screens/AddPath/containers/AddPathPage';
import LoginPage from '../../screens/Authentication/containers/LoginPage';
import handler from '../../components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import MainStudentPage from '../../screens/MainPage/containers/MainStudentPage';
import LecturePage from 'screens/LecturePage/containers/Lectures/index';
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
    <Switch>
      <PublicRoute exact path="/lecture/:lectureId" component={LecturePage} />
      <Route>
        <Header currentUser={mock} />
        <PublicRoute exact path="/public" component={Data} />
        <PublicRoute exact path="/author_settings" component={AuthorSettings} />
        <PublicRoute exact path="/student_settings" component={StudentSettings} />
        <PublicRoute exact path="/" component={LandingPage} />
        <PublicRoute exact path="/public" component={Data} />
        <PublicRoute exact path="/add_path" component={AddPathPage} />
        <PublicRoute exact path="/landing" component={LandingPage} />
        <PublicRoute exact path="/add_course" component={AddCourse} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/main" component={mock.role === 'STUDENT' ? MainStudentPage : MainAuthorPage} />
        <PublicRoute exact path="/oauth/redirect" component={handler} />
      </Route>

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
