import React, { useState } from 'react';
import styles from './styles.module.sass';
import { IArticle } from '../../models/domain';
import { Button, Input, Label } from 'semantic-ui-react';
import {
  saveArticleRoutine
} from '../../routines';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import upload from '@images/file-upload.png';
import { GradientButton } from '@components/buttons/GradientButton';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { history } from '@helpers/history.helper';
import { IBindingCallback1 } from '@models/Callbacks';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { isImage } from '@screens/AddCourse/services/helper.service';
import {
  isValidArticleName,
  ARTICLE_NAME_MESSAGE
} from '@helpers/validation.helper';

export interface IAddArticleProps {
  saveArticle: IBindingCallback1<IArticle>;
  isAuthorized: boolean;
}

export const AddArticlePage: React.FC<IAddArticleProps> = ({
  saveArticle
}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState(undefined);
  const [isArticleNameValid, setIsArticleNameValid] = useState(true);
  const [uploadImage, setUploadImage] = useState(null);

  function validateArticleName(newName?: string) {
    const lastChangesName = typeof newName === 'string' ? newName : name;
    setIsArticleNameValid(!!lastChangesName && isValidArticleName(lastChangesName));
  }
  const isRequiredFieldsValid = !!name && isArticleNameValid;
  const isReadyToRelease = isRequiredFieldsValid && uploadImage && content !== undefined;

  const handleSaveArticle = () => {
    if (!isReadyToRelease) return;
    const article: IArticle = {
      name,
      image: '',
      text: draftToHtml(convertToRaw(content.getCurrentContent())),
      uploadImage
    };
    saveArticle(article);
    history.push('/');
  };

  const handleCancel = () => {
    history.push('/');
  };

  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setImage(URL.createObjectURL(thisFile));
    }
  };
  const editorOptions = ['inline', 'embedded', 'emoji', 'image', 'blockType', 'list', 'textAlign', 'link', 'history'];
  return (
    <>
      <div className={styles.wrapperTitle}>
        <div id={styles.articleTitle}>New Article</div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.wrapPreview}>
            <div className={styles.preview}>
              <div className={styles.form__name}>
                <span className={styles.form__label}>Title:</span>
                <Input
                  name="Name"
                  value={name}
                  className={
                    `${!isArticleNameValid && styles.no_bottom_rounding_field}`
                  }
                  onChange={ev => {
                    const { value } = ev.target;
                    setName(value);
                    validateArticleName(value);
                  }}
                  onBlur={() => validateArticleName()}
                  error={!isArticleNameValid}
                  fluid
                />
                {!isArticleNameValid && (
                  <Label
                    basic
                    className={styles.warningLabel}
                    promt="true"
                    content={ARTICLE_NAME_MESSAGE}
                  />
                )}
              </div>
              <div className={styles.container}>
                <div className={styles.back}>
                  <div className={styles.article_image}>
                    {image && <img src={image} alt="Course" />}
                  </div>
                  <Button as="label" className={image ? styles.imageUploader : styles.imagePlaceholder}>
                    <div className={styles.uploaderInfo}>
                      <img src={upload} alt="Upload" />
                      Upload image here
                    </div>
                    <input name="image" type="file" onChange={e => handleUploadFile(e.target.files[0])} hidden />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wide_container}>
            <div className={styles.form__container}>
              <span className={styles.form__label}>Content:</span>
              <div id={styles.editor_block}>
                <Editor
                  toolbarClassName={styles.form__toolbar}
                  wrapperClassName={styles.form__wrapEditor}
                  editorClassName={styles.form__editor}
                  toolbar={{ options: editorOptions }}
                  editorState={content}
                  onEditorStateChange={setContent}
                />
              </div>
              <div className={`${styles.form__buttons} ${styles.form__group}`}>
                <div className={styles.form__button_row}>
                  <GrayOutlineButton
                    content="Cancel"
                    onClick={handleCancel}
                    className={styles.btn_cancel}
                  />
                  <GradientButton
                    disabled={!isReadyToRelease}
                    className={isReadyToRelease ? styles.button_release : styles.button_release_disabled}
                    onClick={handleSaveArticle}
                    content="Save"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  return {
    isAuthorized
  };
};

const mapDispatchToProps = {
  saveArticle: saveArticleRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticlePage);

