import React from 'react';
import { withRouter } from 'react-router-dom';
import { IAppState } from '../../models/AppState';
import { connect } from 'react-redux';
import { RoleTypes } from '../AppRouter/models/IRole';
import { IUser } from '../AppRouter/models/IUser';
import StudentMainPage from '../../screens/MainPage/containers/MainStudentPage';
import AuthorMainPage from '../../screens/AuthorMainPage/containers/MainPage';
import PrivateRoute from '../../components/PrivateRoute';
import LoginPage from '../../screens/Authentication/containers/LoginPage';

interface IMainPageRouteProps {
  user: IUser;
}

const MainPageRoute: React.FunctionComponent<IMainPageRouteProps> = ({ user }) => {
  let renderComponent: React.FunctionComponent = () => null;
  if (user?.role?.name === RoleTypes[RoleTypes.AUTHOR]) {
    renderComponent = AuthorMainPage;
  } else if (user?.role?.name === RoleTypes[RoleTypes.USER]) {
    renderComponent = StudentMainPage;
  }
  return (
    <PrivateRoute
      exact
      path="/main"
      component={renderComponent !== null ? renderComponent : LoginPage}
    />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.appRouter;
  return {
    user
  };
};

export default withRouter(connect(mapStateToProps)(MainPageRoute));
