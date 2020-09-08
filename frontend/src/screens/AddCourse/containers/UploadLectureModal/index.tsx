import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { Icon, Input, Label, Modal, ModalContent } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { isVideo, cutLink, isLinkValid as checkLink } from './helper';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { IAppState } from 'models/AppState';
import { connect } from 'react-redux';
import { fetchTagsRoutine, fetchLecturesRoutine, saveLectureRoutine, fetchLectureRoutine } from 'screens/AddCourse/routines';
import {
  DESCRIPTION_MESSAGE,
  isValidLectureDescription,
  isValidLectureName,
  LECTURE_MESSAGE,
  VIDEO_FORMAT_MESSAGE,
  LECTURE_TAGS_LIMIT_MESSAGE,
  INVALID_LECTURE_LINK_MESSAGE
} from '@helpers/validation.helper';
import { ITag } from '@screens/AddPath/models/domain';
import { TagSelector } from '@components/TagSelector';
import { history } from '@helpers/history.helper';
import ReactPlayer from 'react-player/lazy';
import { ILectureUpdate } from '@screens/AddCourse/models/ILectureUpdate';

export interface ISaveLecture {
  id?: string;
  video?: File;
  fileName?: string;
  name: string;
  description: string;
  duration: number;
  tags: ITag[];
  link?: string;
}

interface IUploadLectureModalProps {
  id?:string;
  isOpen: boolean;
  openAction: (isOpen: boolean) => void;
  saveLecture: IBindingCallback1<ISaveLecture>;
  getLecture: IBindingCallback1<String>;
  fetchTags: IBindingAction;
  tags: ITag[];
  lectureUpdate: ILectureUpdate;
}

export const UploadLectureModal: React.FC<IUploadLectureModalProps> = ({
  isOpen = false, openAction, saveLecture: save, tags, id, lectureUpdate , getLecture, fetchTags
}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFilename] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidFile, setIsValidFile] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [storedTags, setStoredTags] = useState([]);
  const [isValidTagsAmount, setIsValidTagsAmount] = useState(true);
  const inputRef = createRef<HTMLInputElement>();
  const tagsRef = createRef();
  const [isEdit, setIsEdit] = useState(false);
  const [addByLink, setAddByLink] = useState(false);
  const [link, setLink] = useState('');
  const [isLinkValid, setLinkValid] = useState(true);
  const [isLinkAccepted, setLinkAccepted] = useState(false);
 
  useEffect(() =>{
    if (isOpen){
      fetchTags();
     if(id){
      getLecture(id);   
    } }
    else {
      handleClose();
    }
  }, [id,isOpen]);

  useEffect(()=>{
    if(id){
    setName(lectureUpdate?.name);
    setDescription(lectureUpdate?.description);
    setSelectedTags(lectureUpdate?.tags);
    setDuration(lectureUpdate?.duration);
    if( lectureUpdate?.link){
    setLink(lectureUpdate?.link);
    setAddByLink(true);
    setLinkAccepted(true);
    setFilename(undefined);
    setIsValidFile(false);
    } else{
      setIsValidFile(true);
      setFilename(lectureUpdate?.video);
      setLink(undefined);
      setAddByLink(false);
      setLinkAccepted(false);
    }
  }
  },[lectureUpdate])
 
  useEffect(() => {
    if (history.location.pathname.startsWith('/course/edit')) {
      setIsEdit(true);
    }
    
  }, [history.location.pathname]);

  useEffect(() => {
    setStoredTags(tags?.filter(tag => !selectedTags?.find(t => t.id === tag.id)));
  }, [tags]);

  const validateTagsAmount = (currentTags?: any[]) => {
    const lastChangesTags = currentTags || selectedTags;
    setIsValidTagsAmount(lastChangesTags?.length > 0 && lastChangesTags?.length < 6);
  };

  useEffect(() => {
    validateTagsAmount();
  }, [selectedTags]);
 

  const isReadyToSave = (isValidName && isValidDescription && duration > 0 && isValidTagsAmount)
    && ((isValidFile && file)|| (fileName && id && !file) || isLinkAccepted);

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
    validateTagsAmount();
    const thisFile: File = e.target.files[0];

    if (thisFile && isVideo(thisFile.name)) {
      const vid = document.createElement('video');
      vid.src = URL.createObjectURL(thisFile);
      vid.ondurationchange = function () {
        setDuration(Math.round(vid.duration));
      };
      setFile(thisFile);
      setFilename(thisFile.name);
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
    setFilename(undefined);
    openAction(false);
    setAddByLink(false);
    setLink('');
    setDuration(0);
    setLinkValid(true);
    setLinkAccepted(false);
    setSelectedTags([]);
    setStoredTags(tags);
  };

  const handleSave = () => {
    validateName();
    validateDescription();
    validateTagsAmount(selectedTags);
    if(fileName && id && !file) {
      setIsValidFile(true);
    } else {
    setIsValidFile(file);
    }
    if (!isReadyToSave) return;

    setButtonLoading(true);
    if (addByLink) {
      save({
        id,
        name,
        description,
        link,
        duration,
        tags: selectedTags
      });
    } else {
      save({
        id,
        video: file,
        fileName,
        name,
        description,
        duration,
        tags: selectedTags
      });
    }
    setButtonLoading(false);
    handleClose();
  };

  const toggleWithLink = () => {
    setDuration(0);
    setAddByLink(true);
    setLinkAccepted(false);
    setFile(null);
    setFilename(undefined);
  };

  const toggleWithFile = () => {
    setDuration(0);
    setAddByLink(false);
    setLink('');
  };

  const playerRef = createRef<ReactPlayer>();

  const submitLink = () => {
    const valid = checkLink(link);
    setLinkValid(valid);
    setLinkAccepted(valid);
  };

  function onTagAddition(tag) {
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev?.filter(t => t.id !== tag.id));
  }

  function onTagDeletion(i) {
    const deletedTag = selectedTags[i];
    if (deletedTag !== undefined) {
      setSelectedTags(prev => prev?.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
  }

  const warning = `
    ${isValidFile ? '' : VIDEO_FORMAT_MESSAGE}
    ${isValidTagsAmount ? '' : LECTURE_TAGS_LIMIT_MESSAGE}
    ${isValidDescription ? '' : DESCRIPTION_MESSAGE}
    ${isLinkValid ? '' : INVALID_LECTURE_LINK_MESSAGE}`;

  return (
    <Modal size="small" open={isOpen} onClose={() => handleClose()}>
      <ModalContent className={styles.modal__upload__content}>
        <div className={styles.iconrow}>
  <div className={styles.header}>{id? 'Edit lecture' : 'Add new lecture'}</div>
          {fileName && (
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
                  {fileName?.length > 25 ? `${fileName.substring(0, 23)}...` : fileName}
                </div>
                <Icon
                  name="delete"
                  size="small"
                  onClick={() => {
                    setFile(undefined);
                    setFilename(undefined);
                    setIsValidFile(true);
                  }}
                  inverted
                  className={styles.deleteIcon}
                  color="pink"
                />
              </div>
            </div>
          )}
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
              {!isValidName && (
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
                onClick={isLinkAccepted ? () => setLinkAccepted(false) : () => console.log('Link not accepted')}
                icon={(
                  <Icon
                    name={isLinkAccepted ? 'pencil' : 'delete'}
                    link
                    color="grey"
                    onClick={isLinkAccepted ? () => setLinkAccepted(false) : () => setLink('')}
                  />
                )}
                error={!isLinkValid}
                value={isLinkAccepted ? cutLink(link) : link}
                className={isLinkAccepted ? styles.inactiveinput : styles.linkInput}
                onChange={isLinkAccepted ? () => console.log('Link accepted') : e => setLink(e.target.value)}
                inverted
              />
              {!isLinkAccepted && (
                <GrayOutlineButton onClick={() => submitLink()} className={styles.submit_link}>
                  Submit
                </GrayOutlineButton>
              )}
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
          <div className={styles.toggle_element} onClick={() => (addByLink ? toggleWithFile() : toggleWithLink())}>
            {!addByLink ? 'Or add via link' : 'Or upload file'}
          </div>
        </div>
        <div className={styles.tags_selector}>
          <TagSelector
            ref={tagsRef}
            onDelete={onTagDeletion}
            onAddition={onTagAddition}
            suggestions={storedTags}
            tags={selectedTags}
            id="LectureTags"
          />
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
          {warning.replace(/\s+/g, '').length > 0
          && (<Label basic className={styles.warninglabel} promt="true">{warning}</Label>)}
        </div>
        <GradientButton
          onClick={() => handleSave()}
          loading={buttonLoading}
          className={isReadyToSave ? styles.save_button : styles.save_button_inactive}
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
          onReady={() => setDuration(playerRef.current.getDuration())}
          onDuration={() => setDuration(playerRef.current.getDuration())}
          playing={false}
          onError={error => console.log(error)}
          muted
        />
      </div>
    </Modal>
  );
};
const mapStateToProps = (state: IAppState) => {
  const lectureUpdate= state.addcourse.data.lectureUpdate;
  const tags = state.addcourse.data.tags; 
  return {
   lectureUpdate,
   tags
  };
};
const mapDispatchToProps = {
  fetchTags: fetchTagsRoutine,
  getLecture: fetchLectureRoutine,
  fetchLectures: fetchLecturesRoutine,
  saveLecture: saveLectureRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadLectureModal);
