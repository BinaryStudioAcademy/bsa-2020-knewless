import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Modal, ModalContent, ModalHeader, Input, Icon, Label } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { isVideo } from './helper';

export interface ISaveLecture {
    name: string;
    description: string;
    video: File;
}

interface IUploadLectureModalProps {
    isOpen: boolean;
    openAction: (isOpen: boolean) => void;
    saveAction?: (uploadEntity: ISaveLecture) => void;
  }

export const UploadLectureModal: React.FunctionComponent<IUploadLectureModalProps> = ({
  isOpen = false, openAction, saveAction
}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidFile, setIsValidFile] = useState(true);

  const isSaveble = (isValidName && isValidDescription && isValidFile
    && name.length > 1 && file && (description.length === 0 || description.length > 9));

  const validateName = () => {
    if (name.length === 0) {
      setIsValidName(false);
      return;
    }
    const pattern = /^[a-zA-Z0-9!@#$&()\\-`.+,/"]{2,40}$/;
    setIsValidName(pattern.test(name));
  };

  const validateDescription = () => {
    if (description.length === 0) return;
    const pattern = /^[a-zA-Z0-9!@#$&()\\-`.+,/"]{10,120}$/;
    setIsValidDescription(pattern.test(description));
  };

  const handleAddFile = e => {
    validateDescription();
    validateName();
    setFile(undefined);
    const thisFile: File = e.target.files[0];
    if (thisFile && isVideo(thisFile.name)) {
      setFile(thisFile);
      setIsValidFile(true);
    } else {
      setIsValidFile(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setIsValidFile(true);
    setIsValidName(true);
    setIsValidDescription(true);
    setFile(undefined);
    openAction(false);
  };

  const handleSave = () => {
    validateDescription();
    validateName();
    if (!isSaveble) return;
    handleClose();
  };

  const warning = `${isValidFile ? '' : 'You should add valid video-file. '} 
    ${isValidName ? ''
    : 'Name should consists of 2-40 Latin letters, numbers or special characters. '}
    ${isValidDescription ? ''
    : 'Description should consists of 10-120 Latin letters, numbers or special characters, or be skipped'}`;

  return (
    <Modal size="small" open={isOpen} closeIcon onClose={() => handleClose()}>
      <ModalHeader className={styles.modal__header}>Add new lecture</ModalHeader>
      <ModalContent className={styles.modal__upload__content}>
        <div className={styles.topRow}>
          <div className={styles.inputWrapper}>
            <div className={styles.textcontainer}>Name:</div>
            <Input
              fluid
              type="text"
              error={!isValidName}
              value={name}
              className={styles.customInput}
              onChange={e => { setName(e.currentTarget.value); setIsValidName(true); }}
              onBlur={() => validateName()}
              inverted
            />
          </div>
          <div className={styles.rightside}>
            {file ? (
              <div className={styles.filecontainer}>
                <Icon name="file archive outline" size="big" inverted />
                <span>file attached</span>
              </div>
            ) : ''}
            <GrayOutlineButton
              className={isValidFile ? styles.upload_button : styles.upload_button_error}
              as="label"
            >
              {file ? 'Attach another' : 'Attach lecture'}
              <input name="video" type="file" onChange={e => handleAddFile(e)} hidden />
            </GrayOutlineButton>
          </div>
        </div>
        <div className={styles.textcontainer}>Description:</div>
        <div className={styles.textareacontainer}>
          <textarea
            onChange={ev => { setDescription(ev.target.value); setIsValidDescription(true); }}
            className={isValidDescription ? styles.customtextarea : styles.customtextarea_error}
            value={description}
            onBlur={() => validateDescription()}
          />
          {warning.length > 25
            ? (
              <Label basic className={styles.warninglabel} promt>{warning}</Label>
            ) : '' }
        </div>
        <GradientButton
          onClick={() => handleSave()}
          className={isSaveble ? styles.save_button : styles.save_button_inactive}
        >
          Save
        </GradientButton>
      </ModalContent>
    </Modal>
  );
};
