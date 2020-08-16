import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { store } from '../../store';
import AppRouter from '../AppRouter';

import 'styles/toastrStyles.sass';

const App: React.FC = () => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={3000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      getState={state => state.toastr}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
    />
    <AppRouter />
  </Provider>
);

export default App;
