import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import Header from '@components/Header';
import AddCourse from '@screens/AddCourse/containers/AddCoursePage';
import AddPathPage from '@screens/AddPath/containers/AddPathPage';
import LoginPage from '@screens/Authentication/containers/LoginPage';
import handler from '@components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import LecturePage from 'screens/LecturePage/containers/Lectures/index';
import SettingsRoute from 'containers/SettingsRoute';
import RegisterPage from '@screens/Authentication/containers/RegisterPage';
import AuthorPublicPage from '@screens/AuthorPublicPage/containers/AuthorPublicPage';
import StudentProfile from 'screens/StudentPage/containers/StudentProfilePage';
import { ACCESS_TOKEN } from '@screens/Authentication/constants';
import RootRoute from '../RootRoute';
import PrivateRoute from '../PrivateRoute';
import WebSocketNotifications from 'containers/WebSocketNotifications';
import { RoleTypes } from '../AppRouter/models/IRole';
import { history } from '@helpers/history.helper';
import CoursesPage from '@screens/Courses/containers/CoursesPage';
import CoursePage from '@screens/CoursePage/containers/CoursePage';
import ForgotPassword from '@screens/ResetPassword/containers/ForgotPasswordPage';
import SavePassword from '@screens/SavePassword/containers/SavePasswordPage';
import PathPage from '@screens/PathPage/containers/PathPage';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => {
  const checkHeaderShown = () => {
    const headerBlackList = ['/login', '/register', '/lecture/', '/reset', '/savepassword'];

    return headerBlackList.every(item => !history.location.pathname.startsWith(item));
  };
  const [isHeaderShown, setIsHeaderShown] = useState(checkHeaderShown());

  const connectToWebsocket = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      return (<WebSocketNotifications token={token} />);
    }
    return '';
  };

  history.listen(() => {
    setIsHeaderShown(checkHeaderShown());
  });

  return (
    <div>
      <Switch>
        <Route>
          {isHeaderShown && <Header />}
          <SettingsRoute />
          <RootRoute />
          <PublicRoute exact path="/savepassword/:resetid" component={SavePassword} />
          <PublicRoute exact path="/course/:courseId" component={CoursePage} />
          <PublicRoute exact path="/path/:pathId" component={PathPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/reset" component={ForgotPassword} />
          <PublicRoute exact path="/oauth/redirect" component={handler} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/author/:authorId" component={AuthorPublicPage} />
          <PrivateRoute exact path="/lecture/:lectureId" component={LecturePage} />
          <PrivateRoute exact path="/add_path" roles={[RoleTypes.AUTHOR]} component={AddPathPage} />
          <PrivateRoute exact path="/add_course" roles={[RoleTypes.AUTHOR]} component={AddCourse} />
          <PrivateRoute exact path="/courses" component={CoursesPage} />
          <PrivateRoute exact path="/profile" roles={[RoleTypes.USER]} component={StudentProfile} />
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

export default Routing;
