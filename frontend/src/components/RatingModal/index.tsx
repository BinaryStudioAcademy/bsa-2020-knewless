import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { StyledRating } from '@components/StyledRating';
import styles from './styles.module.sass';
import GradientButton from '@components/buttons/GradientButton';
import { IBindingCallback1 } from '@models/Callbacks';

interface IRatingModal {
  isOpen: boolean;
  submit: IBindingCallback1<number>;
  isLoading: boolean;
  onClose: IBindingCallback1<any>;
}

const RatingModal: FC<IRatingModal> = ({ isOpen, submit, isLoading, onClose }) => {
  const [rating, setRating] = useState(0);

  const onButtonCloseClick = event => {
    setRating(0);
    onClose(event);
  };

  return (
    <Modal basic size="mini" open={isOpen}>
      <div className={styles.main_container}>
        <p className={styles.main_container__title}>Your opinion matters to us</p>
        <p className={styles.main_container__thanks}>
          If you enjoy viewing this course, would you mind to leaving a review? :)
        </p>
        <StyledRating
          className={styles.main_container__rating}
          size="massive"
          rating={rating}
          onRate={((event, data) => setRating(+data.rating))}
        />
        <div className={styles.main_container__button_block}>
          <GradientButton
            className={styles.save_button}
            loading={isLoading}
            onClick={() => submit(rating)}
            size="mini"
            content="Send"
            disabled={rating < 1}
          />
          <Button onClick={onButtonCloseClick} className={styles.cancel_button} content="No, thanks" />
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
