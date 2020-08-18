import React, { useState, createRef } from 'react';
import styles from './styles.module.sass';
import { Modal, ModalContent, Input, Icon, Label } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { isVideo } from './helper';
import { IBindingCallback1 } from 'models/Callbacks';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveLectureRoutine } from 'screens/AddCourse/routines';

export interface ISaveLecture {
    video: File;
    name: string;
    description: string;
    duration: number;
}

interface IUploadLectureModalProps {
    isOpen: boolean;
    openAction: (isOpen: boolean) => void;
    saveLecture: IBindingCallback1<ISaveLecture>;
  }

export const UploadLectureModal: React.FunctionComponent<IUploadLectureModalProps> = ({
  isOpen = false, openAction, saveLecture: save
}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isValidName, setIsValidName] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidFile, setIsValidFile] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  const isSaveble = (duration > 0 && isValidName && isValidDescription && isValidFile
    && name.length > 1 && file && (description.length === 0 || description.length > 9));

  const validateName = () => {
    if (name.length === 0) {
      setIsValidName(false);
      return;
    }
    const pattern = /^[a-zA-Z0-9!:;=<>@#_$&()\\`.+,"-/ ]{3,40}$/;
    setIsValidName(pattern.test(name));
  };

  const validateDescription = () => {
    if (description.length === 0) return;
    const pattern = /^[a-zA-Z0-9!:;=<>@#_$&()\\`.+,"-/ ]{10,}$/;
    setIsValidDescription(pattern.test(description));
  };

  const handleAddFile = e => {
    validateDescription();
    validateName();
    const thisFile: File = e.target.files[0];

    if (thisFile && isVideo(thisFile.name)) {
      const vid = document.createElement('video');
      const fileURL = URL.createObjectURL(thisFile);
      vid.src = fileURL;
      vid.ondurationchange = function() {
        setDuration(duration);
      };
      setFile(thisFile);
      setIsValidFile(true);
    } else if (thisFile) setIsValidFile(false);
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
    setIsValidFile(file);
    if (!isSaveble) return;
    setButtonLoading(true);
    save({
      video: file,
      name,
      description,
      duration
    });
    setButtonLoading(false);
    handleClose();
  };

  const warning = `${isValidFile ? '' : 'You should add video with m4v, avi, mpg, mp4, mkv file extension.'} 
    ${isValidDescription ? ''
    : 'Description should consists of 10 or more Latin letters, numbers or special characters, or be skipped.'}`;

  return (
    <Modal size="small" open={isOpen} onClose={() => handleClose()}>
      <ModalContent className={styles.modal__upload__content}>
        <div className={styles.iconrow}>
          <div className={styles.header}>Add new lecture</div>
          {file ? (
            <div className={styles.filecontainer}>
              <Label
                basic
                size="tiny"
                as="a"
                onClick={() => inputRef.current.click()}
                className={styles.toolBarIcon}
              >
                <Icon name="file archive outline" size="huge" inverted />
              </Label>
              <div className={styles.filenamecontainer}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => inputRef.current.click()}
                  className={styles.filename}
                  onKeyDown={() => validateDescription()}
                >
                  {file?.name?.length > 25 ? `${file.name.substring(0, 23)}...` : file.name}
                </div>
                <Icon
                  name="delete"
                  size="small"
                  onClick={() => {
                    setFile(undefined);
                    setIsValidFile(true);
                  }}
                  inverted
                  className={styles.deleteIcon}
                  color="pink"
                />
              </div>
            </div>
          ) : ''}
        </div>
        <div className={styles.topRow}>
          <div className={styles.inputWrapper}>
            <div className={styles.textcontainer}>Name:</div>
            <div className={styles.input_warning_container}>
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
              {isValidName ? '' : 
                (
                  <Label
                    basic
                    className={styles.warninglabel}
                    promt="true"
                  >
                    Should consists of 3-40 Latin letters, numbers or special characters.
                  </Label>
                )}
            </div>
          </div>
          <div className={styles.rightside}>
            <GrayOutlineButton
              className={isValidFile ? styles.upload_button : styles.upload_button_error}
              as="label"
            >
              Upload
              <input ref={inputRef} name="video/mp4" type="file" onChange={e => handleAddFile(e)} hidden />
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
              <Label basic className={styles.warninglabel} promt="true">{warning}</Label>
            ) : '' }
        </div>
        <GradientButton
          onClick={() => handleSave()}
          loading={buttonLoading}
          className={isSaveble ? styles.save_button : styles.save_button_inactive}
        >
          Save
        </GradientButton>
        <GrayOutlineButton
          className={styles.buttonCancel}
          onClick={() => handleClose()}
        >
          Cancel
        </GrayOutlineButton>
      </ModalContent>
    </Modal>
  );
};

const mapDispatchToProps = {
  fetchLectures: fetchLecturesRoutine,
  saveLecture: saveLectureRoutine
};

export default connect(null, mapDispatchToProps)(UploadLectureModal);
