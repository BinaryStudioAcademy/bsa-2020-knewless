import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDataRoutine } from 'screens/Home/routines';
import { IBindingAction } from 'models/Callbacks';

export interface IDataProps {
  data: any;
  fetchData: IBindingAction;
}

const Data: React.FunctionComponent<IDataProps> = ({
  fetchData: getData
}) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <h1>Inner component</h1>
  );
};

const mapStateToProps = (state: any) => {
  const { data } = state;
  return {
    data
  };
};

const mapDispatchToProps = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
