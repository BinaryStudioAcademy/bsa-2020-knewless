import React, { createRef, useState } from 'react';
import styles from './styles.module.sass';
import { Icon, Input, Label, Modal, ModalContent } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { isVideo, cutLink, isLinkValid as checkLink } from './helper';
import { IBindingCallback1 } from 'models/Callbacks';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveLectureRoutine } from 'screens/AddCourse/routines';
import {
  DESCRIPTION_MESSAGE,
  isValidLectureDescription,
  isValidLectureName,
  LECTURE_MESSAGE, VIDEO_FORMAT_MESSAGE
} from '@helpers/validation.helper';
import ReactPlayer from 'react-player/lazy';
import { render } from 'react-dom';

export interface ISaveLecture {
    video?: File;
    name: string;
    description: string;
    duration?: number;
    link?: string;
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

  const [addByLink, setAddByLink] = useState(false);
  const [link, setLink] = useState('');
  const [isLinkValid, setLinkValid] = useState(true);
  const [isLinkAccepted, setLinkAccepted] = useState(false);

  const isSaveble = (isValidName && isValidDescription && duration > 0 
    && name.length > 1 && (description.length === 0 || description.length > 9)) 
  && ((isValidFile && file) || isLinkAccepted);

  const validateName = (newName?: string) => {
    const lastChangesName = typeof newName === 'string' ? newName : name;
    setIsValidName(!!lastChangesName && isValidLectureName(lastChangesName));
  };

  const validateDescription = (newName?: string) => {
    setIsValidDescription(isValidLectureDescription(typeof newName === 'string' ? newName : description));
  };

  const handleAddFile = e => {
    validateDescription();
    validateName();
    const thisFile: File = e.target.files[0];

    if (thisFile && isVideo(thisFile.name)) {
      const vid = document.createElement('video');
      const fileURL = URL.createObjectURL(thisFile);
      vid.src = fileURL;
      vid.ondurationchange = function () {
        setDuration(Math.round(vid.duration));
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
    setAddByLink(false);
    setLink('');
    setLinkValid(true);
    setLinkAccepted(false);
  };

  const handleSave = () => {
    validateDescription();
    validateName();
    setIsValidFile(file);
    if (!isSaveble) return;
    setButtonLoading(true);
    if (addByLink) {
      save({
        name,
        description,
        link,
        duration
      });
    } else {
      save({
        video: file,
        name,
        description,
        duration
      });
    };
    setButtonLoading(false);
    handleClose();
  };

  const warning = `${isValidFile ? '' : VIDEO_FORMAT_MESSAGE} ${isValidDescription ? '' : DESCRIPTION_MESSAGE} 
        ${isLinkValid ? '' : 'Link isn\'t valid'}`;

  const toggleWithLink = () => {
    setDuration(0);
    setAddByLink(true);
    setLinkAccepted(false);
    setFile(null);
  }

  const toggleWithFile = () => {
    setDuration(0);
    setAddByLink(false);
    setLink('');
  }

  const playerRef = createRef<ReactPlayer>();

  const submitLink = () => {
    const valid = checkLink(link);
    setLinkValid(valid);
    setLinkAccepted(valid);
  }

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
                onChange={e => {
                  const lastChangeValue = e.currentTarget.value;
                  setName(lastChangeValue);
                  validateName(lastChangeValue);
                }}
                onBlur={() => validateName()}
                inverted
              />
              {!isValidName
              && (
                <Label
                  basic
                  className={styles.warninglabel}
                  promt="true"
                >
                  {LECTURE_MESSAGE}
                </Label>
              )}
            </div>
          </div>
          {addByLink ? (
            <div className={styles.link_field}>
                <Input
                  fluid
                  type="text"
                  onClick={isLinkAccepted ? () => setLinkAccepted(false) : () => {}}
                  icon={
                  <Icon
                    name={isLinkAccepted ? "pencil" : "delete"}
                    link
                    color="grey"
                    onClick={isLinkAccepted ? () => setLinkAccepted(false) : () => setLink("")} 
                  />}
                  error={!isLinkValid}
                  value={isLinkAccepted ? cutLink(link) : link}
                  className={isLinkAccepted ? styles.inactiveinput : styles.linkInput}
                  onChange={isLinkAccepted ? () => {} : e => setLink(e.target.value)}
                  inverted
                />
                {!isLinkAccepted && (
                <GrayOutlineButton onClick={() => submitLink()} className={styles.submit_link}>
                  Submit
                </GrayOutlineButton>)}
            </div>
          ) : (
          <div className={styles.rightside}>
            <GrayOutlineButton
              className={isValidFile ? styles.upload_button : styles.upload_button_error}
              as="label"
            >
              Upload
              <input ref={inputRef} name="video/mp4" type="file" onChange={e => handleAddFile(e)} hidden />
            </GrayOutlineButton>
          </div>
          )}
        </div>
        <div className={styles.link_row}> 
          <div className={styles.toggle_element} onClick={() => {addByLink? toggleWithFile() : toggleWithLink()}}>
            {!addByLink? "Or add via link" : "Or upload file"}
          </div>
        </div>
        <div className={styles.textcontainer}>Description:</div>
        <div className={styles.textareacontainer}>
          <textarea
            onChange={ev => {
              const { value } = ev.target;
              setDescription(value);
              validateDescription(value);
            }}
            className={isValidDescription ? styles.customtextarea : styles.customtextarea_error}
            value={description}
            onBlur={() => validateDescription()}
          />
          {warning.length > 25 && (<Label basic className={styles.warninglabel} promt="true">{warning}</Label>)}
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
      <div className={styles.hidden}>
        <ReactPlayer
          ref={playerRef}
          url={link && isLinkValid ? link : 'http://'}
          width="0px"
          height="0px"
          className={styles.react_player}
          onReady={()=>setDuration(playerRef.current.getDuration())}
          onDuration={()=>setDuration(playerRef.current.getDuration())}
          playing={false}
          onError={()=>{}}
          muted
        />
      </div>
    </Modal>
  );
};

const mapDispatchToProps = {
  fetchLectures: fetchLecturesRoutine,
  saveLecture: saveLectureRoutine
};

export default connect(null, mapDispatchToProps)(UploadLectureModal);
