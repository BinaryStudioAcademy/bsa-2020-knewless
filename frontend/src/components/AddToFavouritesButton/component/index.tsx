import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { SourceType } from '../models/helper';
import { IBindingCallback1 } from 'models/Callbacks';
import { IAppState } from 'models/AppState';
import { changeFavouriteStateRoutine, checkFavouriteStateRoutine } from  '../routines';
import { Icon, Label } from 'semantic-ui-react';
import LoaderWrapper from 'components/LoaderWrapper';

interface IAddToFavouriteButtonProps {
  isFavourite: boolean;
  checkFavourite: IBindingCallback1<IFavourite>;
  changeFavourite: IBindingCallback1<IFavourite>;
  isLoading: boolean;
  type: SourceType;
  id: string;
}

interface IFavourite {
  id: string;
  type: SourceType;
}

const AddToFavouriteButton: React.FunctionComponent<IAddToFavouriteButtonProps> = ({
  isFavourite, isLoading, type, id, checkFavourite, changeFavourite
}) => {

  useEffect(() => {
    checkFavourite({
      id,
      type
    });
}, [checkFavourite]);

  const handleChange = () => {
    changeFavourite({
      id,
      type
    });
  };

  return (
    <LoaderWrapper loading={isLoading}>
      <Label
        basic
        size="large"
        as="a"
        onClick={() => handleChange()}
        className={styles.toolBarIcon}
      >
        <Icon fitted name="heart" size="large" inverted className={isFavourite? styles.pushed : styles.inactive}/>
      </Label>
    </LoaderWrapper>
  )
}


const mapStateToProps = (state: IAppState) => {
  const { isFavourite } = state.favouriteButton.data;
  const { loading } = state.favouriteButton.requests.checkFavourite;
  return {
    isLoading: loading,
    isFavourite
  };
};

const mapDispatchToProps = {
  checkFavourite: checkFavouriteStateRoutine,
  changeFavourite: changeFavouriteStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavouriteButton);