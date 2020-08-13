import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import LandingPage from 'screens/Landing/containers/LandingPage';
import PublicRoute from 'components/PublicRoute';
import Data from 'screens/Home/containers/Data';
import Header from '../../components/Header';
import AddCourse from '../../screens/AddCourse/containers/AddCoursePage';
import LoginPage from '../../screens/Authentication/containers/LoginPage';
import handler from '../../components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import MainStudentPage from '../../screens/MainPage/containers/MainStudentPage';
import LecturePage from 'screens/LecturePage/containers/Lectures/index';
import MainAuthorPage from '../../screens/AuthorMainPage/containers/MainPage';
import RegisterPage from '../../screens/Authentication/containers/RegisterPage';
import StudentProfile from 'screens/StudentPage/containers/StudentProfilePage';
import { ACCESS_TOKEN } from '../../screens/Authentication/constants';
import { IAppState } from '../../models/AppState';
import { connect } from 'react-redux';
import { IUser } from 'containers/AppRouter/models/IUser';
import WebSocketNotifications from 'containers/WebSocketNotifications';
import { AddPathPage } from 'screens/AddPath/containers/AddPathPage';
import SettingsRoute from 'containers/SettingsRoute';

export interface IRoutingProps {
  isLoading: boolean;
  user: IUser;
}

const mock: IUser = {
  id: '1',
  nickname: 'name',
  avatar: 'https://media1.tenor.com/images/6f4fa5fea73897955d4b0508c47eeca5/tenor.gif?itemid=14645687',
  role: { name: 'STUDENT' }
};

const role = Math.round(Math.random());
console.log(role);

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading, user }) => {
  const connectToWebsocket = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      return (<WebSocketNotifications token={token} />);
    }
    return '';
  };

  return (
    <div>
      {/* {isAuthorized ? <Header /> : ''} */}
      <Switch>
        <PublicRoute exact path="/lecture/:lectureId" component={LecturePage} />
        <Route>
          <Header />
          <SettingsRoute />
          <PublicRoute exact path="/profile" component={StudentProfile} />
          <PublicRoute exact path="/public" component={Data} />
          <PublicRoute exact path="/" component={LandingPage} />
          <PublicRoute exact path="/public" component={Data} />
          <PublicRoute exact path="/add_path" component={AddPathPage} />
          <PublicRoute exact path="/landing" component={LandingPage} />
          <PublicRoute exact path="/add_course" component={AddCourse} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/main" component={mock.role.name === 'STUDENT' ? MainStudentPage : MainAuthorPage} />
          <PublicRoute exact path="/oauth/redirect" component={handler} />
          <PublicRoute exact path="/register" component={RegisterPage} />
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
      {connectToWebsocket()}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.appRouter;
  return {
    user
  };
};

export default connect(mapStateToProps)(Routing);
