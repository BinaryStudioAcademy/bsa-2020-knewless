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
import LecturePage from 'screens/LecturePage/containers/Lectures/index';
import SettingsRoute from 'containers/SettingsRoute';
import RegisterPage from '../../screens/Authentication/containers/RegisterPage';
import AuthorPublicPage from '../../screens/AuthorPublicPage/containers/AuthorPublicPage';
import StudentProfile from 'screens/StudentPage/containers/StudentProfilePage';
import { ACCESS_TOKEN } from '../../screens/Authentication/constants';
import { IAppState } from '../../models/AppState';
import { connect } from 'react-redux';
import { IUser } from 'containers/AppRouter/models/IUser';
import MainPageRoute from '../MainPageRoute';
import WebSocketNotifications from 'containers/WebSocketNotifications';
import { AddPathPage } from 'screens/AddPath/containers/AddPathPage';

export interface IRoutingProps {
  isLoading: boolean;
  user: IUser;
}

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
          <MainPageRoute />
          <PublicRoute exact path="/oauth/redirect" component={handler} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PublicRoute exact path="/author/:authorId" component={AuthorPublicPage} />
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
