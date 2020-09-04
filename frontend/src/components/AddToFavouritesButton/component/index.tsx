import React from 'react';
import styles from './styles.module.sass';
import { SourceType } from '../helper/SourceType';
import { IBindingCallback1 } from 'models/Callbacks';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import { Label, Icon } from 'semantic-ui-react';
import GradientButton from 'components/buttons/GradientButton';

interface IAddToFavouriteButtonProps {
  isFavourite: boolean;
  changeFavourite: IBindingCallback1<IFavourite>;
  type: SourceType;
  id: string;
}

export interface IFavourite {
  id: string;
  type: SourceType;
}

const AddToFavouriteButton: React.FunctionComponent<IAddToFavouriteButtonProps> = ({
  isFavourite, type, id, changeFavourite
}) => {
  const handleChange = () => {
    changeFavourite({
      id,
      type
    });
  };

  if (type === SourceType.LECTURE) {
    return (
      <Label
        basic
        as="a"
        size="small"
        className={styles.toolBarIcon}
        onClick={() => handleChange()}
      >
        <Icon
          name={isFavourite ? 'heart' : 'heart outline'}
          size="large"
          className={isFavourite ? styles.pushed : styles.notpushed}
          inverted
        />
      </Label>
    );
  }

  return (
    <div className={styles.wrapper}>
      {isFavourite && (
      <GradientButton className={styles.favouriteButton} onClick={() => handleChange()}>
        <div className={styles.unfollow}>
          <div className={styles.textButtonFavourite}>
            My Favourite
          </div>
        </div>
      </GradientButton>
      )}
      {!isFavourite && (
        <GrayOutlineButton
          className={styles.addbutton}
          onClick={() => handleChange()}
        >
          add to favourites
        </GrayOutlineButton>
      )}
    </div>
  );
};

export default AddToFavouriteButton;
