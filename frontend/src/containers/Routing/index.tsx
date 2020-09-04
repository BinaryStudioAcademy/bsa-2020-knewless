import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from 'components/PublicRoute';
import Header from '@components/Header';
import AddCourse from '@screens/AddCourse/containers/AddCoursePage';
import AddPathPage from '@screens/AddPath/containers/AddPathPage';
import AddArticlePage from '@screens/AddArticle/containers/AddArticlePage';
import LoginPage from '@screens/Authentication/containers/LoginPage';
import handler from '@components/OAuth2RedirectHandler/OAuth2RedirectHandler';
import LecturePage from 'screens/LecturePage/containers/Lectures/index';
import SettingsRoute from 'containers/SettingsRoute';
import RegisterPage from '@screens/Authentication/containers/RegisterPage';
import AuthorPublicPage from '@screens/AuthorPublicPage/containers/AuthorPublicPage';
import StudentProfile from 'screens/StudentPage/containers/StudentProfilePage';
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
import { LoginModal } from '@containers/LoginModal';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { loginRoutine } from '@screens/Home/routines';
import { openLoginModalRoutine } from '@containers/LoginModal/routines';
import VerifyEmail from '@components/EmailConfirmation/VerifyEmail';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import PathsPage from '@screens/Paths/containers/PathsPage';
import FavouritesPage from '@screens/Favourites/containers/FavouritesPage';
import SearchResultsPage from '@screens/SearchResultsPage/containers/SearchResultsPage';
import HistoryPage from '@screens/History/containers/HistoryPage';
import { Footer } from '@components/Footer';
import styles from './styles.module.sass';
import { NotFoundPage } from '@screens/NotFound/container/NotFoundPage';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import ArticlePage from '@screens/ArticlePage/containers/ArticlePage';
import WebsocketConnector from '@containers/WebsocketConnector';

export interface IRoutingProps {
  isLoading: boolean;
  isAuthorized: boolean;
  isLoginLoading: boolean;
  isLoginFailure: boolean;
  onOpen: boolean;
  loginUser: IBindingAction;
  setOpen: IBindingCallback1<string>;
  redirectTo: string;
  isSettingsFilled: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({
  isLoading,
  isAuthorized,
  isLoginLoading,
  isLoginFailure,
  onOpen,
  loginUser,
  setOpen,
  redirectTo,
  isSettingsFilled
}) => {
  const checkHeaderShown = () => {
    const headerBlackList = ['/login', '/register', '/lecture/', '/reset', '/savepassword', '/verifyemail'];

    return headerBlackList.every(item => !history.location.pathname.startsWith(item));
  };
  const [isHeaderShown, setIsHeaderShown] = useState(checkHeaderShown());

  history.listen(() => {
    setIsHeaderShown(checkHeaderShown());
  });

  if (isLoading) return <InlineLoaderWrapper loading centered />;

  if (isAuthorized && window.location.pathname !== '/settings' && isSettingsFilled === false) {
    history.push('/settings');
    return (
      <div className={styles.container}>
        {isHeaderShown && <Header />}
        <SettingsRoute exact path="/settings" />
        {isHeaderShown && <Footer />}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isHeaderShown && <Header />}
      <Switch>
        <RootRoute exact path="/" />
        <SettingsRoute exact path="/settings" />
        <PublicRoute exact path="/verifyemail/:confirmId" component={VerifyEmail} />
        <PublicRoute exact path="/savepassword/:resetid" component={SavePassword} />
        <PublicRoute exact path="/course/:courseId" component={CoursePage} />
        <PublicRoute exact path="/path/:pathId" component={PathPage} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/reset" component={ForgotPassword} />
        <PublicRoute exact path="/oauth/redirect" component={handler} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PublicRoute exact path="/courses" component={CoursesPage} />
        <PublicRoute exact path="/paths" component={PathsPage} />
        <PublicRoute exact path="/search" component={SearchResultsPage} />
        <PrivateRoute exact path="/add_article" roles={[RoleTypes.AUTHOR]} component={AddArticlePage} />
        <PrivateRoute exact path="/author/:authorId" component={AuthorPublicPage} />
        <PrivateRoute exact path="/favourites" component={FavouritesPage} />
        <PrivateRoute exact path="/lecture/:lectureId" component={LecturePage} />
        <PrivateRoute exact path="/add_path" roles={[RoleTypes.AUTHOR]} component={AddPathPage} />
        <PrivateRoute exact path="/add_course" roles={[RoleTypes.AUTHOR]} component={AddCourse} />
        <PrivateRoute exact path="/profile" roles={[RoleTypes.USER]} component={StudentProfile} />
        <PrivateRoute exact path="/course/edit/:courseId" roles={[RoleTypes.AUTHOR]} component={AddCourse} />
        <PrivateRoute exact path="/path/edit/:pathId" roles={[RoleTypes.AUTHOR]} component={AddPathPage} />
        <PrivateRoute exact path="/history" roles={[RoleTypes.USER]} component={HistoryPage} />
        <PrivateRoute exact path="/article/:articleId" component={ArticlePage} />
        <PublicRoute path="/404" component={NotFoundPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
      {isHeaderShown && <Footer />}
      <WebsocketConnector />
      <WebSocketNotifications />
      {onOpen && (
        <LoginModal
          onOpen={onOpen}
          isLoginLoading={isLoginLoading}
          isAuthorized={isAuthorized}
          isLoginFailure={isLoginFailure}
          setOpen={setOpen}
          loginUser={loginUser}
          redirectTo={redirectTo}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { settingsFilled } = state.appRouter;
  return {
    isAuthorized: state.auth.auth.isAuthorized,
    isLoginLoading: state.auth.requests.loginRequest.loading,
    isLoginFailure: state.auth.requests.loginRequest.error != null && !state.auth.requests.loginRequest.loading,
    onOpen: state.loginModal.open,
    redirectTo: state.loginModal.redirectTo,
    isSettingsFilled: settingsFilled
  };
};

const mapDispatchToProps = {
  loginUser: loginRoutine.trigger,
  setOpen: openLoginModalRoutine.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
